class ClusterFilter extends Filter {
  constructor(data, menuId, enabledId, itemsId) {
    super(data, menuId, enabledId, itemsId);

    for (let clusterIdx = 0; clusterIdx < data.length; clusterIdx++) {
      this.createInput("radio", `cluster--${clusterIdx}--radio`, clusterIdx, data[clusterIdx].label, "cluster--radio");
    }
  }

  filter(inputIds) {
    // TODO: filter based on buttons
  }
}
