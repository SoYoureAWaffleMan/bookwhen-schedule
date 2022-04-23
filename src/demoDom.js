export default function demoDom(buttonBg, buttonColor) {

  let buttonStyle = {
    backgroundColor: buttonBg,
    color: buttonColor,
  }

	return (
		<>
			<div class="inner">
        <h3>Example Month YEAR</h3>
        <ul>
          <li>
            <div class="wrapper">
              <div class="day-time">
                <span class="day">Day 1st</span> <span class="time">time</span>
              </div>

              <div class="title">
                Activity
              </div>

              <div class="location">
                Location
              </div>
            </div><a class="action" style={buttonStyle}>Book Now</a>
          </li>

          <li>
            <div class="wrapper">
              <div class="day-time">
                <span class="day">Day 2nd</span> <span class="time">time</span>
              </div>

              <div class="title">
                Activity
              </div>

              <div class="location">
                Location
              </div>
            </div><a href="#" class="action" style={buttonStyle}>Book Now</a>
          </li>

          <li>
            <div class="wrapper">
              <div class="day-time">
                <span class="day">Day 3rd</span> <span class="time">time</span>
              </div>

              <div class="title">
                Activity
              </div>

              <div class="location">
                Location
              </div>
            </div><a href="#" class="action" style={buttonStyle}>Book Now</a>
          </li>
        </ul>
      </div>
		</>
	);
}