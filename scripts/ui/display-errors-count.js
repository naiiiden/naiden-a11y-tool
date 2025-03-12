export function displayErrorsCount(auditResults) {
    const errorsCountContainer = document.querySelector("#errors-count-container");
    const errorsCountTotal = document.querySelector("#errors-count-total");

    errorsCountContainer.style.display = "unset";
    errorsCountTotal.style.display = "unset";
    errorsCountTotal.firstElementChild.textContent = `${auditResults.length}`;
    errorsCountTotal.lastElementChild.textContent = `${auditResults.length === 1 ? "error" : "errors"}`;

    const errorsCountIndividualType = {
      "root-and-metadata": { name: "root and metadata", count: 0 },
      "image": { name: "image", count: 0 },
      "empty": { name: "empty element", count: 0 },
      "form": { name: "form", count: 0 },
      "embedded": { name: "embedded element", count: 0 },
      "semantic": { name: "semantic", count: 0 },
      "aria": { name: "aria", count: 0 },
      "css": { name: "css", count: 0 },
      "deprecated": { name: "deprecated element", count: 0 },
      "colour": { name: "colour", count: 0 }
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
          element.firstElementChild.textContent = errorsCountIndividualType[type].count;
          element.lastElementChild.textContent = `${errorsCountIndividualType[type].name} ${errorsCountIndividualType[type].count === 1 ? "error" : "errors"}`;
        });
      }
    }
}