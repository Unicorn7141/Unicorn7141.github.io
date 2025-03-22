document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle logic: using the input with id "switch"
  const toggleCheckbox = document.getElementById("switch");

  // Set default theme based on checkbox state (default: checked = light mode)
  if (toggleCheckbox.checked) {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }

  toggleCheckbox.addEventListener("change", function () {
    if (this.checked) {
      // Light mode active when checked
      document.body.classList.remove("dark-mode");
    } else {
      // Dark mode active when unchecked
      document.body.classList.add("dark-mode");
    }
  });

  // Menu navigation: When a menu item is clicked, load the corresponding section
  const links = document.querySelectorAll("#sidebar .menu-item a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      const sectionId = this.id.replace("-link", "");
      loadSection(sectionId);
    });
  });

  // Load the initial section (home)
  loadSection("home");
});

function loadSection(section) {
  const content = document.getElementById("content");

  if (section === "home") {
    content.innerHTML = `
        <section id="home">
          <h2>Welcome</h2>
          <p>This is the home page of your smart sensors network.</p>
        </section>
      `;
  } else if (section === "devices") {
    content.innerHTML = `
        <section id="devices">
          <h2>Devices</h2>
          <button id="add-device-btn">Add Device</button>
          <div id="add-device-form" style="display: none; margin-top: 1em;">
            <h3>New Device</h3>
            <form id="device-form">
              <label for="device-name">Device Name:</label>
              <input type="text" id="device-name" name="deviceName" required />
              <br/>
              <label for="device-type">Device Type:</label>
              <input type="text" id="device-type" name="deviceType" required />
              <br/>
              <button type="submit">Add Device</button>
            </form>
          </div>
          <ul id="device-list" style="margin-top: 1em;"></ul>
        </section>
      `;

    // Toggle form visibility when "Add Device" is clicked
    const addDeviceBtn = document.getElementById("add-device-btn");
    const addDeviceForm = document.getElementById("add-device-form");
    addDeviceBtn.addEventListener("click", function () {
      addDeviceForm.style.display =
        addDeviceForm.style.display === "none" ? "block" : "none";
    });

    // Handle new device submission
    const deviceForm = document.getElementById("device-form");
    deviceForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const deviceName = document.getElementById("device-name").value;
      const deviceType = document.getElementById("device-type").value;
      const deviceList = document.getElementById("device-list");

      // Create and append a new list item with device info
      const li = document.createElement("li");
      li.textContent = `${deviceName} (${deviceType})`;
      deviceList.appendChild(li);

      // Clear the form inputs and hide the form
      deviceForm.reset();
      addDeviceForm.style.display = "none";
    });
  } else if (section === "settings") {
    content.innerHTML = `
        <section id="settings">
          <h2>Settings</h2>
          <p>Configure your system settings here.</p>
        </section>
      `;
  }
}
