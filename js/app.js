// Replace with your own values
var APPLICATION_ID = 'EZKATKXQMK';
var SEARCH_ONLY_API_KEY = '29771136e84846f06746dd1799bf74fa';
var INDEX_NAME = 'getstarted_actors';
var PARAMS = {
  hitsPerPage: 10,
  maxValuesPerFacet: 8,
};

// Client + Helper initialization
var algolia = algoliasearch(APPLICATION_ID, SEARCH_ONLY_API_KEY);
var algoliaHelper = algoliasearchHelper(algolia, INDEX_NAME, PARAMS);

// DOM BINDING
$searchInput = $('#search-input');
$searchInputIcon = $('#search-input-icon');
$main = $('main');
$sortBySelect = $('#sort-by-select');
$hits = $('#hits');
$stats = $('#stats');
$facets = $('#facets');
$pagination = $('#pagination');

// Hogan templates binding
var hitTemplate = Hogan.compile($('#hit-template').text());
var statsTemplate = Hogan.compile($('#stats-template').text());
var facetTemplate = Hogan.compile($('#facet-template').text());
var sliderTemplate = Hogan.compile($('#slider-template').text());
var paginationTemplate = Hogan.compile($('#pagination-template').text());
var noResultsTemplate = Hogan.compile($('#no-results-template').text());

// Input binding
$searchInput
.on('keyup', function() {
  var query = $(this).val();
  algoliaHelper.setQuery(query).search();
})
.focus();

// Search results
algoliaHelper.on('result', function(content, state) {
  renderStats(content);
  renderHits(content);
});

function renderStats(content) {
  var stats = {
    nbHits: content.nbHits,
    nbHits_plural: content.nbHits !== 1,
    processingTimeMS: content.processingTimeMS
  };
  $stats.html(statsTemplate.render(stats));
}

// Input binding
$searchInput
.on('keyup', function() {
  var query = $(this).val();
  toggleIconEmptyInput(query);
  algoliaHelper.setQuery(query).search();
})
.focus();

$searchInputIcon.on('click', function(e) {
  e.preventDefault();
  $searchInput.val('').keyup().focus();
});

function toggleIconEmptyInput(query) {
  $searchInputIcon.toggleClass('empty', query.trim() !== '');
}
