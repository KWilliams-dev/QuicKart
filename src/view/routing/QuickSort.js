const quickSort = (list, source) => {
    const distance = (x1, x2, y1, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      }
      
      list.forEach(item => {
          item.srcDistance = distance(item.xVal, source.xVal, item.yVal, source.yVal)
      })
  
  
      quickSort(list, 0, list.length - 1)
      console.log(list)

      function quickSort(arr, low, high) {
          if(low < high) {
              let p = partition(arr, low, high)
              quickSort(arr, low, p - 1)
              quickSort(arr, p + 1, high)
          }
      }
      function partition(arr, low, high) {
          let pivot = arr[high].distance
          let partitionIndex = low - 1;
          for(let i = low; i < high - 1; i++) {
              if(arr[i].distance < pivot) {
                  partitionIndex++
                  swap(arr, arr[partitionIndex], arr[i])
              }
          }
          
          partitionIndex++
          swap(arr[partitionIndex], arr[high])
          return partitionIndex
      }
      function swap(arr, low, high) {
          let temp = arr[low]
          arr[low] = arr[high]
          arr[high] = temp
      }
} 
module.exports = quickSort;