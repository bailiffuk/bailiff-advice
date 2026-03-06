// Form submission handler for Web3Forms
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bailiffForm');
    const result = document.getElementById('form-result');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // Show loading state
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                const json = await response.json();
                
                if (json.success) {
                    // Success message
                    result.className = 'form-result success';
                    result.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <strong>Thank you!</strong> Your message has been sent successfully. 
                        Our team will contact you within 24 hours.
                    `;
                    
                    // Reset form
                    form.reset();
                } else {
                    // Error message
                    result.className = 'form-result error';
                    result.innerHTML = `
                        <i class="fas fa-exclamation-circle"></i>
                        <strong>Error:</strong> ${json.message || 'Something went wrong. Please try again.'}
                    `;
                }
            })
            .catch(error => {
                // Network error
                result.className = 'form-result error';
                result.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <strong>Network Error:</strong> Please check your connection and try again.
                `;
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to result
                result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide result after 10 seconds
                setTimeout(() => {
                    result.style.display = 'none';
                }, 10000);
            });
        });
    }
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
