/* Interactivity and Logic for Piyush's Portfolio */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Navbar Scroll styling
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animated
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Active Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-10% 0px -40% 0px'
  });

  sections.forEach(section => activeLinkObserver.observe(section));

  // Contact Form Submission (Fully Functional with Web3Forms + mailto Fallback)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Feedback button state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Collect form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all fields before sending.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
      }

      // Paste your Web3Forms access key inside the quotes below to send automated emails directly!
      // Get a free key instantly at https://web3forms.com
      const web3FormsAccessKey = "aa72e209-4fde-407e-b372-423f7a9400df";

      if (web3FormsAccessKey && web3FormsAccessKey !== "YOUR_ACCESS_KEY_HERE") {
        // Direct Background AJAX Delivery (No redirect, no mail app popup)
        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              access_key: web3FormsAccessKey,
              name: name,
              email: email,
              message: message,
              subject: `Portfolio Contact from ${name}`
            })
          });

          const result = await response.json();
          if (response.status === 200) {
            formStatus.textContent = `Thanks, ${name}! Your message has been sent successfully in the background.`;
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            contactForm.reset();
          } else {
            throw new Error(result.message || "Submission failed");
          }
        } catch (error) {
          console.error("Web3Forms Error:", error);
          formStatus.textContent = `API Error: ${error.message}. Opening local mail client fallback...`;
          formStatus.className = 'form-status error';
          formStatus.style.display = 'block';
          
          // Fallback to mailto draft on submission failure
          setTimeout(() => {
            const subject = `Portfolio Contact from ${name}`;
            const body = `Hi Piyush,\n\nYou received a new message from your portfolio contact form:\n\nMessage:\n${message}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}`;
            const mailtoUrl = `mailto:piyushbhatt7251@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
            contactForm.reset();
          }, 2000);
        }
      } else {
        // Fallback: Open system mail client with pre-filled draft
        const subject = `Portfolio Contact from ${name}`;
        const body = `Hi Piyush,\n\nYou received a new message from your portfolio contact form:\n\nMessage:\n${message}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}`;
        const mailtoUrl = `mailto:piyushbhatt7251@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        formStatus.textContent = `Drafting message... Opening your email client to complete sending.`;
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        
        window.location.href = mailtoUrl;
        contactForm.reset();
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Auto hide status alert after 6 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 6000);
    });
  }

  // Native PDF download is handled directly via index.html link and download attribute

  // Background Interactive Canvas Dash Grid (Mouse Tracking & Flow)
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const spacing = 40; // spacing between dashes
    let dashes = [];
    
    // Mouse state
    const mouse = { x: width / 2, y: height / 2, active: false };
    
    // Theme-compatible color palette (Blue, Purple, Rose)
    const colors = [
      '#2563EB', // Accent Blue
      '#8B5CF6', // Tech Purple
      '#F43F5E'  // Vibrant Rose/Red
    ];
    
    class Dash {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.targetAngle = this.angle;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.length = 8;
        this.thickness = 1.8;
        this.alpha = 0;
        this.targetAlpha = 0;
      }
      
      update() {
        let dx, dy, dist;
        
        if (mouse.active) {
          dx = mouse.x - this.x;
          dy = mouse.y - this.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          
          this.targetAngle = Math.atan2(dy, dx);
          
          // Proximity transparency threshold (only show within 180px of mouse)
          const maxRadius = 180;
          if (dist < maxRadius) {
            this.targetAlpha = 0.45 * (1 - (dist / maxRadius)); // scale transparency
          } else {
            this.targetAlpha = 0;
          }
        } else {
          this.targetAlpha = 0;
        }
        
        // Smoothly transition alpha opacity to avoid flashing
        this.alpha += (this.targetAlpha - this.alpha) * 0.1;
        
        // Only interpolate angle if visual opacity exists
        if (this.alpha > 0.01 && mouse.active) {
          let diff = this.targetAngle - this.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          this.angle += diff * 0.08; // smooth rotation transition
        }
      }
      
      draw() {
        if (this.alpha < 0.005) return; // skip drawing if practically invisible
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.beginPath();
        ctx.moveTo(-this.length / 2, 0);
        ctx.lineTo(this.length / 2, 0);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.globalAlpha = this.alpha;
        ctx.stroke();
        
        ctx.restore();
      }
    }
    
    function init() {
      dashes = [];
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Stagger odd/even rows to create a beautiful hexagonal pattern
          const x = c * spacing + (r % 2 === 0 ? spacing / 2 : 0) - spacing / 2;
          const y = r * spacing - spacing / 2;
          dashes.push(new Dash(x, y));
        }
      }
    }
    
    window.addEventListener('resize', init);
    
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    
    document.addEventListener('mouseleave', () => {
      mouse.active = false;
    });
    
    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < dashes.length; i++) {
        dashes[i].update();
        dashes[i].draw();
      }
      
      requestAnimationFrame(animate);
    }
    
    init();
    animate();
  }

  // Certifications Drawer Show/Hide Expandable Toggle
  const toggleBtn = document.getElementById('toggleCertsBtn');
  const certsDrawer = document.getElementById('certsDrawer');
  if (toggleBtn && certsDrawer) {
    toggleBtn.addEventListener('click', () => {
      certsDrawer.classList.toggle('expanded');
      const isExpanded = certsDrawer.classList.contains('expanded');
      toggleBtn.innerHTML = isExpanded 
        ? 'Hide Course Credentials <i data-lucide="chevron-up" style="width: 16px; height: 16px; margin-left: 6px; vertical-align: middle;"></i>' 
        : 'Show All 25+ Course Credentials & Modules <i data-lucide="chevron-down" style="width: 16px; height: 16px; margin-left: 6px; vertical-align: middle;"></i>';
      // Re-trigger lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }
});
