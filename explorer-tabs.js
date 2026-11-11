(function () {
  function initExploreTabs() {
    var explorePage = document.getElementById('explorePage');
    var categoryPills = explorePage && explorePage.querySelector('.pills');
    if (!explorePage || !categoryPills || document.getElementById('exploreViewTabs')) return;

    var discoverContent = document.createElement('div');
    discoverContent.id = 'exploreDiscoverContent';
    var next = categoryPills.nextElementSibling;
    while (next) {
      var following = next.nextElementSibling;
      discoverContent.appendChild(next);
      next = following;
    }

    var tabs = document.createElement('div');
    tabs.id = 'exploreViewTabs';
    tabs.className = 'explore-view-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Explore views');
    tabs.innerHTML = '<button type="button" class="explore-view-tab active" role="tab" aria-selected="true" aria-controls="exploreDiscoverContent" data-view="discover">Discover</button><span class="explore-view-divider" aria-hidden="true">|</span><button type="button" class="explore-view-tab" role="tab" aria-selected="false" aria-controls="exploreMarketplace" data-view="marketplace">Marketplace</button>';

    var marketplace = document.createElement('section');
    marketplace.id = 'exploreMarketplace';
    marketplace.className = 'explore-marketplace hidden';
    marketplace.setAttribute('role', 'tabpanel');
    marketplace.setAttribute('aria-labelledby', 'exploreMarketplaceTab');
    marketplace.innerHTML = '<div class="marketplace-empty"><div class="marketplace-empty-icon" aria-hidden="true">✦</div><h2>Marketplace</h2><p>Discover films, stories, and creator offerings in one place.</p><span>Coming soon</span></div>';

    categoryPills.insertAdjacentElement('afterend', tabs);
    tabs.insertAdjacentElement('afterend', discoverContent);
    discoverContent.insertAdjacentElement('afterend', marketplace);

    tabs.querySelectorAll('.explore-view-tab').forEach(function (button) {
      button.addEventListener('click', function () {
        var showDiscover = button.getAttribute('data-view') === 'discover';
        tabs.querySelectorAll('.explore-view-tab').forEach(function (tab) {
          var active = tab === button;
          tab.classList.toggle('active', active);
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        discoverContent.classList.toggle('hidden', !showDiscover);
        marketplace.classList.toggle('hidden', showDiscover);
      });
    });
    tabs.querySelector('[data-view="marketplace"]').id = 'exploreMarketplaceTab';
  }

  var style = document.createElement('style');
  style.textContent = '.explore-view-tabs{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:12px;padding:8px 16px 14px}.explore-view-tab{height:48px;border:1.5px solid transparent;border-radius:20px;background:#F3F3F3;color:#888;font-size:16px;font-weight:800;cursor:pointer}.explore-view-tab.active{background:#FFF8E0;border-color:#FFC82E;color:#111}.explore-view-divider{font-size:20px;color:#111}.explore-marketplace{padding:10px 16px 24px}.marketplace-empty{min-height:240px;padding:28px 20px;border:1px solid #F0E7C8;border-radius:20px;background:linear-gradient(180deg,#FFF9E5,#fff);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.marketplace-empty-icon{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:#FFC82E;color:#111;font-size:26px;margin-bottom:14px}.marketplace-empty h2{font-size:20px;margin-bottom:6px}.marketplace-empty p{max-width:260px;color:#777;font-size:14px;line-height:1.5}.marketplace-empty span{margin-top:16px;padding:8px 14px;border-radius:999px;background:#F0F0F0;color:#666;font-size:12px;font-weight:700}@media(prefers-reduced-motion:no-preference){.explore-view-tab{transition:background .18s ease,border-color .18s ease,color .18s ease}}';
  document.head.appendChild(style);
  initExploreTabs();
})();
