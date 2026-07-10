document.addEventListener("DOMContentLoaded", () => {

    const quizForm = document.getElementById("quizForm");

    // Quiz Page
    if (quizForm) {

        quizForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const answers = {};

            const formData = new FormData(quizForm);

            formData.forEach((value, key) => {
                answers[key] = value;
            });

            try {

                const response = await fetch("/recommend", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(answers)
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.error || "Something went wrong.");
                    return;
                }

                localStorage.setItem("careerResult", data.result);

                window.location.href = "/result";

            } catch (error) {

                console.error(error);
                alert("Unable to connect to the AI server.");

            }

        });

    }

    // Result Page
    const resultBox = document.getElementById("result");

    if (resultBox) {

        const result = localStorage.getItem("careerResult");

        if (result) {

            resultBox.innerHTML = result
                .replace(/\n/g, "<br>")
                .replace(/Best Career:/g, "<strong>💼 Best Career:</strong>")
                .replace(/Reason:/g, "<strong>📝 Reason:</strong>")
                .replace(/Skills Required:/g, "<strong>🛠 Skills Required:</strong>")
                .replace(/Expected Salary in India:/g, "<strong>💰 Expected Salary in India:</strong>");

        } else {

            resultBox.innerHTML =
                "<h3>No recommendation found.</h3>";

        }

    }

});