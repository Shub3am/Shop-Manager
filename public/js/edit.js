const EditBtn = document.querySelector(".Data-Edit");
const Edit = document.querySelector(".Data");
const Name = document.querySelector("#Name").innerText;
const Price = document.querySelector("#Price").innerText;
const Category = document.querySelector("#Category").innerText;
const Product = document
  .querySelector("title")
  .innerText.split(" ")
  .slice(1)
  .join();

EditBtn.addEventListener("click", () => {
  const Form_Exists = document.querySelector(".InputArea");
  if (Edit.contains(Form_Exists)) {
    Edit.removeChild(Form_Exists);
  } else {
    AppendtoDiv();
  }
});

function AppendtoDiv() {
  const form = CreateFormElement();
  Edit.appendChild(form);
}

function CreateFormElement() {
  const form = document.createElement("form");
  form.classList.add("InputArea");
  form.setAttribute("method", "POST");
  form.setAttribute("action", `/products/${Product}/edit?_method=PATCH`);
  const Nameinput = CreateInputElement("text", "Enter New Name", Name);
  const PriceInput = CreateInputElement("number", "Enter New Price", Price);
  Nameinput.name = "Name";
  PriceInput.name = "Price";
  const Submit = document.createElement("input");
  Submit.type = "submit";
  PriceInput.setAttribute("min", "0");
  const CategoryChange = CreateSelectElement(
    ["vegatable", "fruits", "nonVeg"],
    Category
  );
  form.append(Nameinput, PriceInput, CategoryChange, Submit);

  return form;
}

function CreateInputElement(type, placeholder = "", defaultvalue) {
  const CreatedElement = document.createElement("input");
  CreatedElement.type = type;
  CreatedElement.placeholder = placeholder;
  CreatedElement.value = defaultvalue;
  return CreatedElement;
}

function CreateSelectElement(items, defaultvalue) {
  const CreatedElement = document.createElement("select");
  CreatedElement.name = "Category";
  items.forEach((item) => {
    const tempOption = document.createElement("option");
    item == defaultvalue ? (tempOption.selected = true) : null;
    tempOption.value = item;
    tempOption.text = item;
    CreatedElement.appendChild(tempOption);
  });
  return CreatedElement;
}
