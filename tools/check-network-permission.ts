import assert from 'node:assert/strict';
import {requireLocalNetworkAccess} from '../src/networkPermission';
async function main(){
 let checks=0,requests=0,allowed=false,granted=true;
 const permission={check:async()=>{checks++;return allowed;},request:async()=>{requests++;return granted;}};
 await requireLocalNetworkAccess('ios',37,permission);await requireLocalNetworkAccess('android',36,permission);assert.equal(checks,0);assert.equal(requests,0);
 await requireLocalNetworkAccess('android',37,permission);assert.equal(checks,1);assert.equal(requests,1);
 allowed=true;await requireLocalNetworkAccess('android',37,permission);assert.equal(requests,1);
 allowed=false;granted=false;await assert.rejects(()=>requireLocalNetworkAccess('android',37,permission),/Local network access is required/);
 console.log('PASS only Android 17+ requests local-network access, existing grants skip prompts, and denied access prevents pairing.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
