let tab = [5, 1, -2, -8, 4, 5];
function showClosestToZero(tab) {
  if (tab.length === 0) {
    console.log("Le tableau est vide");
  }
  var closest = tab[0];
  for (let i = 0; i < tab.length; i++) {
    const t = parseInt(tab[i]);
    if (t < 0 && t > closest) {
      closest = t;
    } else if (t > 0 && t < closest) {
      closest = t;
    }
  }
  return closest;
}

console.log(showClosestToZero(tab));
