export function loadBtn() {
  const isloadBtn = ref(false);
  const LocalePath = useLocalePath();
  
  function handleClick(routePAth:any) {
    isloadBtn.value = true;
    setTimeout(() => {
      navigateTo(LocalePath(routePAth));
    }, 50);
  }
  return { isloadBtn, handleClick };
}
