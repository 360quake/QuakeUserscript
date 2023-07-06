// ==UserScript==
// @name         quakedeleteinfo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  替换quake网页个人中心里的敏感信息为******!
// @author       360quake
// @match        https://quake.360.net/quake/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=360.net
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function replaceEmailAndPhoneNumbers() {
    // 获取所有的<span>标签
    const spanTags = document.getElementsByTagName("span");

    // 遍历每个<span>标签
    for (let i = 0; i < spanTags.length; i++) {
      const spanTag = spanTags[i];
      const text = spanTag.textContent.trim();

      // 判断<span>标签的值是否为邮箱地址或以+86开头的手机号
      if (isEmail(text) || isPhoneNumber(text)) {
        // 将包含邮箱地址或手机号的<span>标签的值修改为"***********"
        spanTag.textContent = "***********";
      }
    }
  }

  // 判断给定的值是否为邮箱地址
  function isEmail(value) {
    // 使用正则表达式进行邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  // 判断给定的值是否为以+86开头的手机号码
  function isPhoneNumber(value) {
    const phoneNumberRegex = /^\+86\d{11}$/;
    return phoneNumberRegex.test(value);
  }

  // 在页面加载时进行替换操作
  replaceEmailAndPhoneNumbers();

  // 在DOM树变化时进行替换操作
  const observer = new MutationObserver(replaceEmailAndPhoneNumbers);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
