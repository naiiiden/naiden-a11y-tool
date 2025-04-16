// export function displayErrorsCount(auditResults) {
//     const errorsCountContainer = document.querySelector("#errors-count-container");
//     const errorsCountTotal = document.querySelector("#errors-count-total");

//     if (auditResults.length === 0) {
//       errorsCountContainer.style.display = "none";
//     } else {
//       errorsCountContainer.style.display = "grid";
//     }
//     errorsCountTotal.firstElementChild.textContent = `${auditResults.length}`;

//     const errorsCountIndividualType = {
//       "root-and-metadata": { name: "Root And Metadata", count: 0 },
//       "image": { name: "Image", count: 0 },
//       "empty": { name: "Empty Element", count: 0 },
//       "form": { name: "Form", count: 0 },
//       "embedded": { name: "Embedded Element", count: 0 },
//       "semantic": { name: "Semantic", count: 0 },
//       "ARIA": { name: "ARIA", count: 0 },
//       "CSS": { name: "CSS", count: 0 },
//       "deprecated": { name: "Deprecated Element", count: 0 },
//       "colour": { name: "Colour", count: 0 }
//     };

//     auditResults.forEach(error => {
//       if (error.type in errorsCountIndividualType) {
//         errorsCountIndividualType[error.type].count++;
//       }
//     });

//     for (const type in errorsCountIndividualType) {
//       if (errorsCountIndividualType.hasOwnProperty(type)) {
//         const elements = document.querySelectorAll(`.${type}`);

//         elements.forEach(element => {
//           if (errorsCountIndividualType[type].count === 0) {
//             element.style.display = "none";
//             element.nextElementSibling.style.display = "none";
//           } else {
//             element.firstElementChild.textContent = errorsCountIndividualType[type].count;
//           }
//         });
//       }
//     }
// }

export function displayErrorsCount(auditResults) {
  const errorsCountContainer = document.querySelector("#errors-count-container");
  if (!errorsCountContainer) return;

  // Reset content
  errorsCountContainer.innerHTML = "";

  if (auditResults.length === 0) {
    errorsCountContainer.style.display = "none";
    return;
  } else {
    errorsCountContainer.style.display = "grid";
  }

  // Count errors by type
  const errorsCountByType = {};
  let totalCount = 0;

  auditResults.forEach(({ type }) => {
    errorsCountByType[type] = (errorsCountByType[type] || 0) + 1;
    totalCount++;
  });

  // Render each type
  for (const [type, count] of Object.entries(errorsCountByType)) {
    const formattedType = type.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    const p = document.createElement("p");
    p.className = type;
    p.id = `errors-count-${type}`;

    const countSpan = document.createElement("span");
    countSpan.className = "count";
    countSpan.textContent = count;

    const labelSpan = document.createElement("span");
    labelSpan.textContent = `${formattedType} Errors`;

    const viewLink = document.createElement("a");
    viewLink.href = `#${type}`;
    viewLink.textContent = "View";

    p.appendChild(countSpan);
    p.appendChild(labelSpan);
    errorsCountContainer.appendChild(p);
    errorsCountContainer.appendChild(viewLink);
  }

  // Render total
  const totalP = document.createElement("p");
  totalP.id = "errors-count-total";

  const totalCountSpan = document.createElement("span");
  totalCountSpan.className = "count";
  totalCountSpan.textContent = totalCount;

  const totalLabelSpan = document.createElement("span");
  totalLabelSpan.textContent = "Total Errors";

  totalP.appendChild(totalCountSpan);
  totalP.appendChild(totalLabelSpan);
  errorsCountContainer.appendChild(totalP);
}
