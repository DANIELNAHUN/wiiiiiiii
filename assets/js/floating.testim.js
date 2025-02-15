async function loadTestimonials() {
  try {
    const response = await fetch("./assets/js/razones_nahun.json")
    const testimonials = await response.json()
    const container = document.getElementById("testimonials")
    let index = 0

    function createTestimonial(testimonial) {
      const element = document.createElement("div")
      element.classList.add("testimonial")
      element.textContent = testimonial.msg

      const x = Math.random() * (container.offsetWidth - 270)
      const y = Math.random() * (container.offsetHeight - 100)

      element.style.left = `${x}px`
      element.style.top = `${y}px`
      
      container.appendChild(element)

      // Trigger reflow to ensure the transition works
      void element.offsetWidth

      // Add active class to start animations
      element.classList.add("active")

      // Start fade out after 7 seconds (3 seconds fall + 4 seconds display)
      setTimeout(() => {
        element.classList.add("fade-out")
      }, 2000)

      // Remove element after fade out (1 second for fade out)
      setTimeout(() => {
        element.remove()
      }, 3000)
    }

    // function createTestimonialGroup(groupTestimonials) {
    //   groupTestimonials.forEach((testimonial, index) => {
    //     setTimeout(() => createTestimonial(testimonial), index * 200)
    //   })
    // }

    function displayTestimonials() {
      let index = 0

      function displayNextTestimonial() {
        // const groupTestimonials = testimonials.slice(index, index + 3)
        createTestimonial(testimonials[index])

        index = (index + 1) % testimonials.length

        setTimeout(displayNextTestimonial, 700)
      }

      displayNextTestimonial()
    }

    displayTestimonials()
  } catch (error) {
    console.error("Error loading testimonials:", error)
  }
}

function setupChatButton() {
  const chatButton = document.getElementById("chatButton")
  const chatPopup = document.getElementById("chatPopup")
  const closeChat = document.getElementById("closeChat")

  chatButton.addEventListener("click", () => {
    chatPopup.style.display = chatPopup.style.display === "none" ? "block" : "none"
  })

  closeChat.addEventListener("click", () => {
    chatPopup.style.display = "none"
  })
}

loadTestimonials()
setupChatButton()