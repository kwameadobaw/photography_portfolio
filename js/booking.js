document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const modal = document.getElementById('bookingConfirmation');
    const closeBtn = document.querySelector('.close');
    const bookingSummary = document.getElementById('bookingSummary');
    
    // Add animation classes to form elements for a staggered entrance effect
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.classList.add('animate-in');
        group.style.animationDelay = `${index * 0.1}s`;
    });
    
    if (bookingForm) {
        // Set the form action to FormSubmit endpoint with your email
        bookingForm.setAttribute('action', 'https://formsubmit.co/adobaw.kjhcvoh@gmail.com');
        bookingForm.setAttribute('method', 'POST');
        
        // Add FormSubmit specific fields
        const formSubmitFields = `
            <input type="hidden" name="_subject" value="New Photography Booking Request">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_next" value="${window.location.href}">
            <input type="hidden" name="_template" value="table">
        `;
        bookingForm.insertAdjacentHTML('afterbegin', formSubmitFields);
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const packageType = document.getElementById('package');
            const packageText = packageType.options[packageType.selectedIndex].text;
            const sessionType = document.getElementById('sessionType');
            const sessionText = sessionType.options[sessionType.selectedIndex].text;
            const message = document.getElementById('message').value;
            
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Format time
            const formattedTime = time.split(':').map((num, index) => {
                if (index === 0) {
                    return (num % 12) || 12;
                }
                return num;
            }).join(':') + (parseInt(time.split(':')[0]) >= 12 ? ' PM' : ' AM');
            
            // Create booking summary with enhanced styling
            bookingSummary.innerHTML = `
                <div class="confirmation-header">
                    <i class="fas fa-check-circle"></i>
                    <h3>Booking Confirmed!</h3>
                </div>
                <div class="confirmation-details">
                    <p><strong>Name:</strong> <span>${name}</span></p>
                    <p><strong>Email:</strong> <span>${email}</span></p>
                    <p><strong>Phone:</strong> <span>${phone}</span></p>
                    <p><strong>Date:</strong> <span>${formattedDate}</span></p>
                    <p><strong>Time:</strong> <span>${formattedTime}</span></p>
                    <p><strong>Package:</strong> <span>${packageText}</span></p>
                    <p><strong>Session Type:</strong> <span>${sessionText}</span></p>
                    ${message ? `<p><strong>Additional Information:</strong> <span>${message}</span></p>` : ''}
                </div>
                <div class="confirmation-footer">
                    <p>We'll contact you shortly to confirm your booking.</p>
                </div>
            `;
            
            // Show modal with animation
            modal.style.display = 'block';
            setTimeout(() => {
                modal.querySelector('.modal-content').classList.add('show');
            }, 10);
            
            // Submit the form to FormSubmit after showing the confirmation
            setTimeout(() => {
                this.submit();
            }, 1500);
            
            // Reset form will happen automatically after redirect
        });
    }
    
    // Close modal when clicking the X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.querySelector('.modal-content').classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.querySelector('.modal-content').classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
    
    // Date validation - prevent booking in the past
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        dateInput.value = tomorrowFormatted;
        
        // Add calendar icon and styling
        const dateWrapper = dateInput.parentElement;
        dateWrapper.classList.add('date-input-wrapper');
        const calendarIcon = document.createElement('i');
        calendarIcon.className = 'fas fa-calendar-alt';
        dateWrapper.appendChild(calendarIcon);
    }
    
    // Add clock icon to time input
    const timeInput = document.getElementById('time');
    if (timeInput) {
        const timeWrapper = timeInput.parentElement;
        timeWrapper.classList.add('time-input-wrapper');
        const clockIcon = document.createElement('i');
        clockIcon.className = 'fas fa-clock';
        timeWrapper.appendChild(clockIcon);
    }
    
    // Package selection highlight with enhanced visual feedback
    const packageSelect = document.getElementById('package');
    if (packageSelect) {
        packageSelect.addEventListener('change', function() {
            const packages = document.querySelectorAll('.package');
            const selectedValue = this.value;
            
            packages.forEach(pkg => {
                pkg.classList.remove('selected');
                pkg.classList.remove('not-selected');
            });
            
            if (selectedValue) {
                packages.forEach(pkg => {
                    const packageTitle = pkg.querySelector('h3').textContent.toLowerCase();
                    
                    if (packageTitle.includes(selectedValue)) {
                        pkg.classList.add('selected');
                        // Add a pulse animation
                        pkg.classList.add('pulse');
                        setTimeout(() => {
                            pkg.classList.remove('pulse');
                        }, 1000);
                        // Scroll to the selected package
                        pkg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        pkg.classList.add('not-selected');
                    }
                });
            }
        });
    }
    
    // Add interactive form field effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Add filled class if the input has a value
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
        
        // Check initial state
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('filled');
        }
    });
    
    // Add progress indicator for form completion
    const formProgress = document.createElement('div');
    formProgress.className = 'form-progress';
    formProgress.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">0% Complete</div>
    `;
    
    if (bookingForm) {
        bookingForm.prepend(formProgress);
        
        // Update progress as user fills out the form
        const requiredInputs = bookingForm.querySelectorAll('[required]');
        const totalRequired = requiredInputs.length;
        
        function updateProgress() {
            let filledCount = 0;
            requiredInputs.forEach(input => {
                if (input.value.trim() !== '') {
                    filledCount++;
                }
            });
            
            const progressPercent = Math.round((filledCount / totalRequired) * 100);
            const progressFill = formProgress.querySelector('.progress-fill');
            const progressText = formProgress.querySelector('.progress-text');
            
            progressFill.style.width = `${progressPercent}%`;
            progressText.textContent = `${progressPercent}% Complete`;
            
            // Change color based on progress
            if (progressPercent < 30) {
                progressFill.style.backgroundColor = '#ff6b6b';
            } else if (progressPercent < 70) {
                progressFill.style.backgroundColor = '#ffd166';
            } else {
                progressFill.style.backgroundColor = '#06d6a0';
            }
        }
        
        requiredInputs.forEach(input => {
            input.addEventListener('input', updateProgress);
            input.addEventListener('change', updateProgress);
        });
        
        // Initial progress check
        updateProgress();
    }
});
