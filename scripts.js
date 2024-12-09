// const emailInput = document.getElementById("email");
// const verifyButton = document.getElementById("verify-btn");
// const verificationCodeSection = document.getElementById("verification-code-section");
// const confirmButton = document.getElementById("confirm-btn");
// const resendButton = document.getElementById("resend-btn");
// const errorMessage = document.getElementById("error-message");
// const timerDisplay = document.getElementById("timer");
// const resendBtn=document.getElementById("resend-btn");

// // Mock email 
// const emailVerificationSystem = {
//     sendVerificationCode(email) {
//         // Simulate API call to send a code
//         const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
//         alert(`Verification code is: ${verificationCode}`);
//         console.log(`Verification code sent to ${email}: ${verificationCode}`);
//         return verificationCode;
//     },
// };

// // The current verification code
// let currentVerificationCode = "";

// // Function to mask email for display
// function maskEmail(email) {
//     const [localPart, domain] = email.split("@");
//     const maskedLocal = localPart.slice(0, 2) + "***";
//     return `${maskedLocal}@${domain}`;
// }

// // Timer logic
// let timerInterval;
// function startTimer(duration, displayElement) {
//     let timeRemaining = duration;
//     displayElement.textContent = `Wait ${timeRemaining} seconds before requesting new code.`;

//     timerInterval = setInterval(() => {
//         timeRemaining--;
//         displayElement.textContent = formatTime(timeRemaining);
//         // displayElement.textContent = `Wait ${timeRemaining} seconds before requesting new code.`;

//         if (timeRemaining <= 0) {
//             clearInterval(timerInterval);
//             displayElement.textContent = "You can request a new code now.";
//             resendBtn.disabled = false;
//            resendBtn.opacity = "1";
//             resendBtn.curser = "pointer";
//         }
//     }, 1000);
// }

// function formatTime(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `Wait ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} seconds before requesting new code.`;
// }

// // Event Listener for Send Verification Code
// verifyButton.addEventListener("click", (event) => {
//     event.preventDefault();

//     const email = emailInput.value;
//     if (!email) {
//         errorMessage.textContent = "Please enter a valid email address.";
//         errorMessage.style.display = "block";
//         return;
//     }

//     errorMessage.style.display = "none";

//     // Send verification code
//     currentVerificationCode = emailVerificationSystem.sendVerificationCode(email);

//     // Show the verification code section
//     emailInput.style.display="none";
//     verifyButton.style.display="none";
//     verificationCodeSection.style.display = "block";
//     document.querySelector("#verification-code-section strong").textContent = maskEmail(email);

//     // Start timer for resend button
//     resendButton.disabled = true;
//     startTimer(60, timerDisplay);
// });

// // Event Listener: Verify Code
// confirmButton.addEventListener("click", () => {
//     const enteredCode = document.getElementById("code").value;

//     if (enteredCode === currentVerificationCode) {
//         errorMessage.style.display = "none";
//         window.location.href = "form.html";
//     } else {
//         errorMessage.textContent = "Invalid verification code. Please try again.";
//         errorMessage.style.display = "block";
//     }
// });

// // Event Listener: Resend Code
// resendButton.addEventListener("click", () => {
//     const email = emailInput.value;

//     if (!email) {
//         errorMessage.textContent = "Please enter a valid email address.";
//         errorMessage.style.display = "block";
//         return;
//     }

//     errorMessage.style.display = "none";

//     // Resend the verification code
//     currentVerificationCode = emailVerificationSystem.sendVerificationCode(email);

//     // Restart the timer
//     resendButton.disabled = true;
//     startTimer(60, timerDisplay);
// });


document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const verifyButton = document.getElementById("verify-btn");
    const verificationCodeSection = document.getElementById("verification-code-section");
    const confirmButton = document.getElementById("confirm-btn");
    const resendButton = document.getElementById("resend-btn");
    const errorMessage = document.getElementById("error-message");
    const timerDisplay = document.getElementById("timer");

    // Mock email verification system
    const emailVerificationSystem = {
        sendVerificationCode(email) {
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            alert(`Verification code is: ${verificationCode}`);
            console.log(`Verification code sent to ${email}: ${verificationCode}`);
            return verificationCode;
        },
    };

    let currentVerificationCode = "";

    function maskEmail(email) {
        const [localPart, domain] = email.split("@");
        const maskedLocal = localPart.slice(0, 2) + "***";
        return `${maskedLocal}@${domain}`;
    }

    let timerInterval;
    function startTimer(duration, displayElement) {
        let timeRemaining = duration;
        displayElement.textContent = `Wait ${timeRemaining} seconds before requesting new code.`;

        timerInterval = setInterval(() => {
            timeRemaining--;
            displayElement.textContent = formatTime(timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                displayElement.textContent = "You can request a new code now.";
                resendButton.disabled = false;
                resendButton.style.opacity = "1";
                resendButton.style.cursor = "pointer";
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `Wait ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} seconds before requesting new code.`;
    }

    // Event Listener for Send Verification Code
    verifyButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission

        const email = emailInput.value;
        if (!email) {
            errorMessage.textContent = "Please enter a valid email address.";
            errorMessage.style.display = "block";
            return;
        }

        errorMessage.style.display = "none";

        // Send the verification code
        currentVerificationCode = emailVerificationSystem.sendVerificationCode(email);

        // Show the verification code section
        emailInput.style.display = "none";
        verifyButton.style.display = "none";
        verificationCodeSection.style.display = "block";
        document.querySelector("#verification-code-section strong").textContent = maskEmail(email);

        // Start timer for resend button
        resendButton.disabled = true;
        startTimer(60, timerDisplay);
    });

    // Event Listener for Verify Code
    confirmButton.addEventListener("click", () => {
        const enteredCode = Array.from(document.querySelectorAll(".code-input"))
            .map(input => input.value)
            .join('');

        if (enteredCode === currentVerificationCode) {
            errorMessage.style.display = "none";
            window.location.href = "form.html"; // Redirect to form page
        } else {
            errorMessage.textContent = "Invalid verification code. Please try again.";
            errorMessage.style.display = "block";
        }
    });

    // Event Listener for Resend Code
    resendButton.addEventListener("click", () => {
        const email = emailInput.value;

        if (!email) {
            errorMessage.textContent = "Please enter a valid email address.";
            errorMessage.style.display = "block";
            return;
        }

        errorMessage.style.display = "none";

        // Resend the verification code
        currentVerificationCode = emailVerificationSystem.sendVerificationCode(email);

        // Restart the timer
        resendButton.disabled = true;
        startTimer(60, timerDisplay);
    });
});

