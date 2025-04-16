export function displayErrorsCount(auditResults) {
  const errorsCountContainer = document.querySelector("#errors-count-container");

  errorsCountContainer.innerHTML = "";
  errorsCountContainer.style.display = "grid";

  const heading = document.createElement("h2");
  heading.textContent = "Found Errors";
  errorsCountContainer.appendChild(heading);

  const innerDiv = document.createElement("div");

  const errorsCountByType = {};
  let totalCount = 0;

  auditResults.forEach(({ type }) => {
    errorsCountByType[type] = (errorsCountByType[type] || 0) + 1;
    totalCount++;
  });

  const formatLabel = (type) =>
    // root-and-metadata > Root And Metadata
    type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) + " Errors";

  for (const [type, count] of Object.entries(errorsCountByType)) {
    const p = document.createElement("p");
    p.id = `errors-count-${type}`;
    p.className = type;

    const countSpan = document.createElement("span");
    countSpan.className = "count";
    countSpan.textContent = count;

    const labelSpan = document.createElement("span");
    labelSpan.textContent = formatLabel(type);

    const viewLink = document.createElement("a");
    viewLink.href = `#${type}`;
    viewLink.textContent = "View";
    viewLink.ariaLabel = `View ${formatLabel(type)} errors`;

    p.appendChild(countSpan);
    p.appendChild(labelSpan);
    innerDiv.appendChild(p);
    innerDiv.appendChild(viewLink);
  }

  const totalP = document.createElement("p");
  totalP.id = "errors-count-total";

  const totalCountSpan = document.createElement("span");
  totalCountSpan.className = "count";
  totalCountSpan.textContent = totalCount;

  const totalLabelSpan = document.createElement("span");
  totalLabelSpan.textContent = "Total Errors";

  totalP.appendChild(totalCountSpan);
  totalP.appendChild(totalLabelSpan);
  innerDiv.appendChild(totalP);
  errorsCountContainer.appendChild(innerDiv);
}