document.addEventListener('DOMContentLoaded', () => {
  var popup,
    domain,
    d = document,
    inboxEl = d.getElementById('inbox');

  popup = {
    init: function() {
      var memoEl = d.getElementById('memo');
      getCurrentTabUrl((url) => {
        if (url.match(urlPattern)) {
          domain = getDomain(url);
          getMemoOnDomain(domain, (memo) => {
            memoEl.value = memo;
          });
        } else {
          d.getElementById('panel-bottom').style.display = 'none';
          inboxEl.className += 'disabled';
          inboxEl.innerHTML = chrome.i18n.getMessage('notSupportedUrl');
        }
      });

      var btnSave = d.getElementById('btn-save');
      btnSave.innerHTML = chrome.i18n.getMessage('btnSave');
      btnSave.addEventListener('click', () => {
        setMemoOnDomain(domain, memoEl.value);
        getCurrentTab((tab) => {
          setIconByMemoStatus(tab);
        });
      });

      var btnClear = d.getElementById('btn-clear');
      btnClear.innerHTML = chrome.i18n.getMessage('btnClear');
      btnClear.addEventListener('click', () => {
        memoEl.value = '';
        btnSave.click();
      });
    }
  }

  popup.init();
});