export default (arr, selectedIndex) => {
    counter = 0;
    let itemSelected = null;
    for (var idx in arr) {
        if (counter == selectedIndex) {
            itemSelected = idx;
            break;
        }
        counter++;
    }
    return itemSelected;
}