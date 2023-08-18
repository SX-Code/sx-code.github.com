const maxLine = 20;
/**
 * 所有class为code的td标签
 */
const reg = new RegExp("fa-angles-down");//这里利用正则表达式
var codeElementArr = document.querySelectorAll('td.code');
codeElementArr.forEach((code, index) => {
  const preCode = code.children[0].children[0]
  //add id, example: ZYCode1、ZYCode2... 可能以后用到index吧
  // preCode.setAttribute('id','ZYCode'+(index+1))
  preCode.setAttribute('style', '-webkit-line-clamp: ' + maxLine + ';')

  //add over
  if (preCode.outerHTML.split('<br>').length > maxLine) {
    let clickScroll;
    const codeCopyDiv = document.createElement('div');
    codeCopyDiv.setAttribute('class', 'CodeCloseDiv');
    // 显示折叠
    code.parentNode.parentNode.parentNode.parentNode.appendChild(codeCopyDiv);
    // 显示作者
    code.parentNode.parentNode.parentNode.parentNode.classList.add('author')
    // 其他样式
    preCode.parentNode.setAttribute('style', 'margin-bottom: 0px');
    const codeCopyOver = document.createElement('button');
    // codeCopyOver.setAttribute('id','ZYCodeOver'+(index+1));
    codeCopyOver.setAttribute('class', 'CodeClose');
    const openI= document.createElement('i');
	openI.setAttribute('class', "fa-solid fa-angles-down  fa-beat-fade");
    codeCopyOver.appendChild(openI);
    const haveDes = code.parentNode.parentNode.parentNode.parentNode.childNodes.length===3
    code.parentNode.parentNode.parentNode.parentNode.children[haveDes?2:1].appendChild(codeCopyOver);
	
    codeCopyOver.addEventListener('click', async () => {
      let isOpen = reg.test(codeCopyOver.childNodes[0].className);
      if (!isOpen) {
      	codeCopyOver.childNodes[0].setAttribute('class', 'fa-solid fa-angles-down  fa-beat-fade');
        document.documentElement.scrollTop = clickScroll;
        preCode.setAttribute('style', '-webkit-line-clamp: ' + maxLine + ';padding-bottom:0px!important');
      } else {
      	codeCopyOver.childNodes[0].setAttribute('class', 'fa-solid fa-angles-up  fa-beat-fade');
        clickScroll = document.documentElement.scrollTop;
        preCode.setAttribute('style', '-webkit-line-clamp: 99999;padding-bottom:0px!important')
      }

    })
  }

  // add btn 
  const codeCopyBtn = document.createElement('div');
  codeCopyBtn.classList.add('copy-btn');
  // copy icon
  const copyI = document.createElement('i');
  copyI.setAttribute('class', 'fa-regular fa-copy');
  copyI.style.color = '#aa69ec';
  
  codeCopyBtn.appendChild(copyI);
  code.appendChild(codeCopyBtn);

  //add fun
  codeCopyBtn.addEventListener('click', async () => {
    const currentCodeElement = code.children[0]?.innerText;
    await copyCode(currentCodeElement);

    setCopySuccessIcon(codeCopyBtn.childNodes[0])
    codeCopyBtn.classList.add('success');

    setTimeout(() => {
      setCopyIcon(codeCopyBtn.childNodes[0])
      codeCopyBtn.classList.remove('success');
    }, 3000)

  })
})
// 设置拷贝图标
function setCopyIcon(node) {
  node.setAttribute('class', 'fa-regular fa-copy');
  node.style.color = '#aa69ec';
}
// 设置拷贝成功图标
function setCopySuccessIcon(node) {
  node.setAttribute('class', 'fa-regular fa-circle-check');
  node.style.color = 'limegreen';
}

async function copyCode(currentCode) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(currentCode)
    } catch (error) {
      // 未获得用户许可
      console.error(error)
    }
  } else {
    console.error('当前浏览器不支持此api')
  }
}
