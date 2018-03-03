module.exports = {
   disableDeviceEmulation: true,

  passes: [{
    recordTrace: true,
    pauseAfterLoadMs: 5250,
    networkQuietThresholdMs: 5250,
    cpuQuietThresholdMs: 5250,
    useThrottling: true,
    gatherers: [
      'url',
      'chrome-console-messages',
      'image-usage',
      'accessibility',
      'dobetterweb/all-event-listeners',
      'dobetterweb/anchors-with-no-rel-noopener',
      'dobetterweb/appcache',
      'dobetterweb/domstats',
      'dobetterweb/js-libraries',
      'dobetterweb/optimized-images',
      'dobetterweb/password-inputs-with-prevented-paste',
      'dobetterweb/response-compression',
      'dobetterweb/tags-blocking-first-paint',
      'dobetterweb/websql',
    ],
  }],

  audits: [
    'first-meaningful-paint',
    'speed-index-metric',
    'estimated-input-latency',
    'first-interactive',
    'consistently-interactive',
    'errors-in-console',
    'time-to-first-byte',
    'first-interactive',
    'critical-request-chains',
    'byte-efficiency/total-byte-weight',
    'byte-efficiency/uses-optimized-images',
    'dobetterweb/dom-size',
    'dobetterweb/link-blocking-first-paint',
    'dobetterweb/no-document-write',
    'dobetterweb/no-vulnerable-libraries',
    'dobetterweb/script-blocking-first-paint',
    'dobetterweb/uses-passive-event-listeners'
  ],

   output: 'json',
    'output-path': '/Users/maizhikun/Learning/apache_sites/k-performance/test_demo/repose.json',
    view: true
};