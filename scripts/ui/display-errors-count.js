export function displayErrorsCount(auditResults) {
    const errorsCountContainer = document.querySelector("#errors-count-container");
    const errorsCountTotal = document.querySelector("#errors-count-total");

    errorsCountContainer.style.display = "grid";
    errorsCountTotal.firstElementChild.textContent = `${auditResults.length}`;
    errorsCountTotal.lastElementChild.textContent = `${auditResults.length === 1 ? "Error" : "Errors"}`;

    const errorsCountIndividualType = {
      "root-and-metadata": { name: "Root And Metadata", count: 0 },
      "image": { name: "Image", count: 0 },
      "empty": { name: "Empty Element", count: 0 },
      "form": { name: "Form", count: 0 },
      "embedded": { name: "Embedded Element", count: 0 },
      "semantic": { name: "Semantic", count: 0 },
      "aria": { name: "ARIA", count: 0 },
      "css": { name: "CSS", count: 0 },
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
            element.parentElement.style.display = "none";
          } else {
            element.firstElementChild.textContent = errorsCountIndividualType[type].count;
            element.lastElementChild.textContent += ` ${errorsCountIndividualType[type].count === 1 ? "Error" : "Errors"}`;
          }
        });
      }
    }
}