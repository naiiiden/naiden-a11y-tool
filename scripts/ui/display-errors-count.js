export function displayErrorsCount(auditResults) {
    const errorsCountContainer = document.querySelector("#errors-count-container");
    const errorsCountTotal = document.querySelector("#errors-count-total");

    if (auditResults.length === 0) {
      errorsCountContainer.style.display = "none";
    } else {
      errorsCountContainer.style.display = "grid";
    }
    errorsCountTotal.firstElementChild.textContent = `${auditResults.length}`;

    const errorsCountIndividualType = {
      "root-and-metadata": { name: "Root And Metadata", count: 0 },
      "image": { name: "Image", count: 0 },
      "empty": { name: "Empty Element", count: 0 },
      "form": { name: "Form", count: 0 },
      "embedded": { name: "Embedded Element", count: 0 },
      "semantic": { name: "Semantic", count: 0 },
      "ARIA": { name: "ARIA", count: 0 },
      "CSS": { name: "CSS", count: 0 },
      "deprecated": { name: "Deprecated Element", count: 0 },
      "colour": { name: "Colour", count: 0 }
    };

    auditResults.forEach(error => {
      if (error.type in errorsCountIndividualType) {
        errorsCountIndividualType[error.type].count++;
      }
    });

    for (const type in errorsCountIndividualType) {
      if (errorsCountIndividualType.hasOwnProperty(type)) {
        const elements = document.querySelectorAll(`.${type}`);

        elements.forEach(element => {
          if (errorsCountIndividualType[type].count === 0) {
            element.style.display = "none";
            element.nextElementSibling.style.display = "none";
          } else {
            element.firstElementChild.textContent = errorsCountIndividualType[type].count;
          }
        });
      }
    }
}