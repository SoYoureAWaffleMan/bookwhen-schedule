/**
 * This is the code that interacts with with the Bookwhen API, independent
 * .. of Wordpress editor, block, React etc. It seeks elements that match
 * .. a selector, grabs the API key off a data attribute and requests the
 * .. approprate data
 */

function onDocReady(fn) {
  // See if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

function populateSchedules() {
  const shells = document.querySelectorAll('.wp-block-bookwhen-schedule')
  shells.forEach(shell => populate(shell))
}

onDocReady(populateSchedules)

/**
 * Grab data from the Bookwhen API
 * docs: https://api.bookwhen.com/v2
 * @param {HTML Element} shell The element to populate
 */
function populate(shell) {
  let inner = shell.querySelector('.inner');
  let url = 'https://api.bookwhen.com/v2/events?include=location,tickets';
  let username = shell.dataset.apiKey;
  let password = '';
  let finished = false;
  let minSecondsPassed = false;
  let minSeconds = 2;

  if (!username) {
    console.warn('No Bookwhen API key found. Bailing...');
    return;
  }

  shell.classList.add('loading')

  setTimeout(function() {
    minSecondsPassed = true;
    if(finished) {
      shell.classList.remove('loading');
    }
  }, minSeconds * 1000);

  // For browser compatibility... let's do this old school
  jQuery.ajax({
    url: url,
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
    },
    success(responseObject) {
      let months = groupItemsByMonth(responseObject)

      Object.keys(months).forEach(function(monthLabel) {
        addMonthToInner(monthLabel, months[monthLabel], inner)
      })
    },
    complete() {
      finished = true;
      if(minSecondsPassed) {
        shell.classList.remove('loading');
      }
    }
  })
}

function groupItemsByMonth(responseObject) {
  let monthsObj = {}

  if(Array.isArray(responseObject.data) === false) {
    console.warn('Bad response data property');
    return {};
  }

  if(Array.isArray(responseObject.included) === false) {
    console.warn('Bad response included property');
    return {};
  }

  let items = responseObject.data
  let included = responseObject.included

  items.forEach(function(item) {
    let startIso = item.attributes.start_at; // e.g. "2021-11-23T19:30:00.000+00:00"
    let startDate = new Date(startIso);

    // Build a month label, used for heading and also to group items by e.g. 'November 2021'
    // Also day label, e.g. 'Thursday 20', time label e.g. '9:15 pm'
    let monthLabel = startDate.toLocaleDateString('en-GB', {month: 'long', year: 'numeric'});
    let dayLabel = startDate.toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric'});
    item.dayLabel = dayLabel+ getOrdinal(startDate.getDate());
    item.timeLabel = startDate.toLocaleTimeString('en-GB', { hour12: true, hour: 'numeric', minute: 'numeric' })

    let location = getLocationForItem(item, included);
    item.locationLabel = location
      // ? location.attributes.address_text.replace(/(?:\r\n|\r|\n)/g, ', ')
      ? location.attributes.address_text.split("\n")[0]
      : ''

    if (monthsObj.hasOwnProperty(monthLabel)) {
      monthsObj[monthLabel].push(item)
    } else {
      monthsObj[monthLabel] = [item]
    }
  })

  return monthsObj;
}

/**
 *
 * @param {*} item
 */
function getLocationForItem(item, included){

  try{
    let locationId = item.relationships.location.data.id
    return included.find(i => i.type === 'location' && i.id === locationId) || null
  } catch(e) { }
}

/**
 * @param {Integer} d The date number
 * @returns {String} the relevant ordinal
 */
function getOrdinal(d) {
  var o = ["th", "st", "nd", "rd"];
  var v = d%100;
  return o[(v-20)%10] || o[v] || o[0];
}

/**
 *
 * @param {String} monthLabel the heading to add
 * @param {Array} items the event items to add
 * @param {HTML Element} inner the element to add things to
 */
function addMonthToInner(monthLabel, items, inner) {
  let liStrings = '';

  items.forEach(function(item) {
    let day = `<div class="day-time"><span class="day">${item.dayLabel}</span> <span class="time">${item.timeLabel}</span></div>`;
    let title = `<div class="title">${item.attributes.title}</div>`;
    let location = `<div class="location">${item.locationLabel}</div>`;
    let action = `<a href="${getEventUrlForId(item.id)}" class="action">Book Now</a>`;
    liStrings += `<li><div class="wrapper">${day}${title}${location}</div>${action}</li>`;
  })

  let dom = `<h3>${monthLabel}</h3><ul>${liStrings}</ul>`;
  let frag = document.createRange().createContextualFragment(dom);

  inner.appendChild(frag)
}

/**
 * Build a Bookwhen event URL from its URL e.g.
 * https://bookwhen.com/movema/e/ev-s2rc-20211130193000
 * @param {String} eventId The event eventId e.g. "ev-s2rc-20220111193000"
 */
function getEventUrlForId(eventId) {
  return 'https://bookwhen.com/movema/e/'+eventId
}

