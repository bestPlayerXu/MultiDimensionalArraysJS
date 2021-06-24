class MultiDimensionArray {
  constructor(dimensionLengthArray) {
    this.dimensionLengthArray = dimensionLengthArray;
    this.multiDArray = [];
    this.offset = [];
    //everything is in 1d array => what needs to be multiplied with to find the right dimension?
    for (var i = this.dimensionLengthArray.length - 1; i >= 0; i--) {
      this.offset[i] = this.dimensionLengthArray.reduce((a, b, j) => {
        if (i >= j) {
          a *= b;
        }
        return a
      }, 1);
    }
  }

  set(value, dimensions) {
    if (!this.checkIfRightDimension(dimensions)) throw 'Not right dimensions!'
    var offset = this.getTotalOffsetByDimensions(dimensions);
    this.multiDArray[offset] = value;
  }
  
  get(dimensions) {
    if (!this.checkIfRightDimension(dimensions)) throw 'Not right dimensions!'
    var offset = this.getTotalOffsetByDimensions(dimensions);
    return this.multiDArray[offset];
  }

  checkIfRightDimension(dimensions) {
    return dimensions.reduce((a, b, i) => a && b >= 0 && b <= this.dimensionLengthArray[i], true);
  }

  getTotalOffsetByDimensions(dimensions) {
    return dimensions.reduce((a, b, i) => a + b * this.offset[i], 0);
  }
}
module.exports = MultiDimensionArray;