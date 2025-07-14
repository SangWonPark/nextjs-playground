/**
 * 실무 시나리오 기반 Promise 테스트 (계속)
 */

// 6. 실제 호패 DID 검증 시나리오 시뮬레이션 (계속)
  function verifyZKProof(proof: string): Promise<{valid: boolean, computation: string}> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.12) {
          reject(new Error(`ZK-Proof ${proof} 검증 계산 오류`));
        } else {
          resolve({
            valid: Math.random() > 0.02,
            computation: `ZK-Proof ${proof} 계산 완료 (1024bit)`
          });
        }
      }, Math.random() * 1500 + 800); // ZK 검증은 더 오래 걸림
    });
  }

  const verificationTasks = [
    { type: 'DID Signature', id: 'did:example:123' },
    { type: 'SD-JWT', id: 'eyJ0eXAiOiJKV1Q...' },
    { type: 'ZK-Proof', id: 'zk_proof_abc123' },
    { type: 'DID Signature', id: 'did:example:456' },
    { type: 'SD-JWT', id: 'eyJ0eXAiOiJKV2...' },
  ];

  console.log(colors.cyan('🔍 다중 DID 검증 처리 중...'));
  const startTime = Date.now();
  
  const results = await Promise.allSettled([
    verifyDIDSignature('did:example:123'),
    verifySDJWT('eyJ0eXAiOiJKV1Q...'),
    verifyZKProof('zk_proof_abc123'),
    verifyDIDSignature('did:example:456'),
    verifySDJWT('eyJ0eXAiOiJKV2...')
  ]);
  
  const endTime = Date.now();

  console.log(colors.green('\n📊 DID 검증 결과:'));
  results.forEach((result, index) => {
    const task = verificationTasks[index];
    if (result.status === 'fulfilled') {
      const value = result.value as any;
      if (value.valid) {
        console.log(colors.green(`  ✅ ${task.type} (${task.id.substring(0, 20)}...): 유효`));
      } else {
        console.log(colors.yellow(`  ⚠️  ${task.type} (${task.id.substring(0, 20)}...): 무효한 인증`));
      }
    } else {
      console.log(colors.red(`  ❌ ${task.type} (${task.id.substring(0, 20)}...): 검증 오류`));
    }
  });

  const validCount = results.filter(r => 
    r.status === 'fulfilled' && (r.value as any).valid
  ).length;
  
  console.log(colors.cyan(`\n🎯 검증 통계: ${validCount}/${results.length} 유효한 인증`));
  console.log(colors.green(`⏱️  총 검증 시간: ${endTime - startTime}ms`));
  console.log(colors.yellow('💡 Promise.allSettled로 일부 실패해도 전체 검증 과정 완료\n'));
}

// 메인 실행 함수
async function runRealWorldTests() {
  console.log(colors.blue('🌍 실무 시나리오 기반 Promise 테스트 시작'));
  console.log('='.repeat(60));
  
  try {
    await testMultiplePaymentProcessing();
    await testBatchSocialMissionValidation();
    await testCloudResourceCollection();
    await testConcurrencyControl();
    await testRetryPattern();
    await testDIDVerificationScenario();
    
    console.log(colors.blue('🎉 모든 실무 시나리오 테스트 완료!'));
    console.log('='.repeat(60));
    
    console.log(colors.cyan('\n📚 테스트 결론:'));
    console.log(colors.yellow('• Promise.all: 모든 작업이 성공해야 하는 경우 (트랜잭션)'));
    console.log(colors.yellow('• Promise.allSettled: 부분 성공을 허용하는 경우 (데이터 수집, 알림)'));
    console.log(colors.yellow('• 동시성 제어: 시스템 부하 방지'));
    console.log(colors.yellow('• 재시도 패턴: 네트워크 불안정성 대응'));
    console.log(colors.yellow('• 배치 처리: 대용량 데이터 효율적 처리\n'));
    
  } catch (error) {
    console.error(colors.red('테스트 실행 중 오류 발생:'), error);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  runRealWorldTests().catch(console.error);
}

export { 
  runRealWorldTests,
  testMultiplePaymentProcessing,
  testBatchSocialMissionValidation,
  testCloudResourceCollection,
  testConcurrencyControl,
  testRetryPattern,
  testDIDVerificationScenario
};
