export const disableScroll = (scrollbar = false, forceScrollbar = false) => {
  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y'); 
  const body = document.body;

  if ((scrollbar && body.scrollHeight > body.clientHeight) || forceScrollbar) {
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
    body.style.overflowY = 'scroll';
  }else{
    body.style.overflow = 'hidden';
  }
};

export const enableScroll = () => {
  const body = document.body;
  body.style.position = '';
  body.style.overflowY = '';
  body.style.top = '';
  body.style.overflow = 'visible';
};
