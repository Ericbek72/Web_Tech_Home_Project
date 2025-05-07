const selectButtons = document.querySelectorAll(".select-button");
const paymentPopupOverlay = document.getElementById("paymentPopupOverlay");
const popupTitle = document.getElementById("popupTitle");
const selectedServiceInput = document.getElementById("selectedService");
const paymentForm = document.getElementById("paymentForm");

// Elements for the artwork purchase pop-up
const buyNowButtons = document.querySelectorAll(".buy-now-button");
const artworkPurchasePopupOverlay = document.getElementById(
  "artworkPurchasePopupOverlay"
);
const artworkPopupTitle = document.getElementById("artworkPopupTitle");
const selectedArtworkInput = document.getElementById("selectedArtwork");
const artworkNameDisplay = document.getElementById("artworkNameDisplay");
const artworkPurchaseForm = document.getElementById("artworkPurchaseForm");

selectButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission
    const service = this.dataset.service;
    popupTitle.textContent = `Payment Details for ${service} service`;
    selectedServiceInput.value = service;
    paymentPopupOverlay.style.display = "flex"; // Show the pop-up
  });
});

buyNowButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior (#)
    event.stopPropagation(); // Stop the click from propagating to parent elements (carousel)
    const artworkName = this.dataset.artwork;
    artworkPopupTitle.textContent = `Purchase Artwork: ${artworkName}`;
    artworkNameDisplay.textContent = artworkName;
    selectedArtworkInput.value = artworkName;
    artworkPurchasePopupOverlay.style.display = "flex";
  });
});

function closePopup() {
  paymentPopupOverlay.style.display = "none"; // Hide the pop-up
}

function closeArtworkPopup() {
  artworkPurchasePopupOverlay.style.display = "none";
}

function submitPayment() {
  const selectedService = selectedServiceInput.value;
  const paymentMethod = document.querySelector(
    'input[name="payment_method"]:checked'
  );

  if (paymentMethod) {
    const paymentData = {
      service: selectedService,
      payment_method: paymentMethod.value,
    };

    fetch("/process_payment_ajax", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        closePopup();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during payment.");
        closePopup();
      });
  } else {
    alert("Please select a payment method.");
  }
}

function submitArtworkPurchase() {
  const selectedArtwork = selectedArtworkInput.value;
  const paymentMethod = document.querySelector(
    'input[name="artwork_payment_method"]:checked'
  );

  if (paymentMethod) {
    const purchaseData = {
      artwork: selectedArtwork,
      payment_method: paymentMethod.value,
    };

    fetch("/process_artwork_purchase_ajax", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(purchaseData),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        closeArtworkPopup();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Artwork purchase error.");
        closeArtworkPopup();
      });
  } else {
    alert("Please select a payment method for the artwork.");
  }
}
