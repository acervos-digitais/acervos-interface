class CategoryFilter extends Filter {
  constructor(data, menuId, itemsId) {
    super(data, menuId, itemsId);

    for (const cat of Object.keys(data)) {
      const labelSlug = cat.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, cat, cat);
    }
  }

  filter(inputIds) {
    // TODO: filter based on checkboxes
  }
}
