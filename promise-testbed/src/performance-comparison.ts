/**
 * 성능 비교 및 메모리 사용량 테스트
 * 실행: npm run test:performance
 */

// 색상 출력 헬퍼
const colors = {
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
  magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
};

// 메모리 사용량 측정 헬퍼
function getMemoryUsage() {
  const usage = process.memoryUsage();
  return {
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100, // MB
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100,
    external: Math.round(usage.external / 1024 / 1024 * 100) / 100,
    rss: Math.round(usage.rss / 1024 / 1024 * 100) / 100
  };
}

function logMemoryUsage(label: string) {
  const memory = getMemoryUsage();
  console.log(colors.cyan(`${label}: Heap ${memory.heapUsed}MB / RSS ${memory.rss}MB`));
}

// 무거운 작업 시뮬레이션
function heavyTask(id: number, size: number = 1000): Promise<{id: number, result: number[], size: number}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 메모리 사용량을 늘리기 위한 큰 배열 생성
      const largeArray = new Array(size).fill(0).map((_, i) => i * Math.random());
      
      // CPU 집약적 작업 시뮬레이션
      let sum = 0;
      for (let i = 0; i < size; i++) {
        sum += largeArray[i] * Math.sqrt(i + 1);
      }
      
      resolve({
        id,
        result: largeArray,
        size: largeArray.length
      });
    }, Math.random() * 100 + 50);
  });
}

// 1. Promise.all vs Promise.allSettled 성능 비교
async function compareBasicPerformance() {
  console.log(colors.blue('\n⚡ === 기본 성능 비교 ==='));
  
  const taskCount = 20;
  const taskSize = 5000;
  
  console.log(colors.cyan(`📊 ${taskCount}개 작업, 각 ${taskSize.toLocaleString()}개 요소 배열 처리`));
  
  // Promise.all 테스트
  console.log(colors.yellow('\n🔄 Promise.all 테스트:'));
  logMemoryUsage('시작 전');
  
  const startAll = Date.now();
  const allStartMemory = getMemoryUsage();
  
  try {
    const resultsAll = await Promise.all(
      Array.from({ length: taskCount }, (_, i) => heavyTask(i, taskSize))
    );
    
    const endAll = Date.now();
    const allEndMemory = getMemoryUsage();
    
    console.log(colors.green(`✅ Promise.all 완료: ${endAll - startAll}ms`));
    console.log(colors.cyan(`메모리 증가: ${allEndMemory.heapUsed - allStartMemory.heapUsed}MB`));
    console.log(colors.green(`처리된 데이터: ${resultsAll.length}개 작업\n`));
    
  } catch (error) {
    console.log(colors.red(`❌ Promise.all 실패: ${error}\n`));
  }
  
  // 메모리 정리를 위한 가비지 컬렉션 강제 실행
  if (global.gc) {
    global.gc();
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Promise.allSettled 테스트
  console.log(colors.yellow('🔄 Promise.allSettled 테스트:'));
  logMemoryUsage('시작 전');
  
  const startSettled = Date.now();
  const settledStartMemory = getMemoryUsage();
  
  const resultsSettled = await Promise.allSettled(
    Array.from({ length: taskCount }, (_, i) => heavyTask(i, taskSize))
  );
  
  const endSettled = Date.now();
  const settledEndMemory = getMemoryUsage();
  
  const successful = resultsSettled.filter(r => r.status === 'fulfilled').length;
  
  console.log(colors.green(`✅ Promise.allSettled 완료: ${endSettled - startSettled}ms`));
  console.log(colors.cyan(`메모리 증가: ${settledEndMemory.heapUsed - settledStartMemory.heapUsed}MB`));
  console.log(colors.green(`처리된 데이터: ${successful}/${resultsSettled.length}개 작업 성공\n`));
}

// 2. 순차 vs 병렬 처리 성능 비교
async function compareSequentialVsParallel() {
  console.log(colors.blue('\n🔀 === 순차 vs 병렬 처리 비교 ==='));
  
  const taskCount = 15;
  const taskSize = 3000;
  
  // 순차 처리
  console.log(colors.yellow('🔄 순차 처리 테스트:'));
  logMemoryUsage('시작 전');
  
  const startSequential = Date.now();
  const sequentialStartMemory = getMemoryUsage();
  
  const sequentialResults = [];
  for (let i = 0; i < taskCount; i++) {
    const result = await heavyTask(i, taskSize);
    sequentialResults.push(result);
    
    if (i % 5 === 0) {
      logMemoryUsage(`작업 ${i + 1} 완료 후`);
    }
  }
  
  const endSequential = Date.now();
  const sequentialEndMemory = getMemoryUsage();
  
  console.log(colors.green(`✅ 순차 처리 완료: ${endSequential - startSequential}ms`));
  console.log(colors.cyan(`메모리 증가: ${sequentialEndMemory.heapUsed - sequentialStartMemory.heapUsed}MB\n`));
  
  // 메모리 정리
  if (global.gc) {
    global.gc();
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // 병렬 처리
  console.log(colors.yellow('🔄 병렬 처리 테스트:'));
  logMemoryUsage('시작 전');
  
  const startParallel = Date.now();
  const parallelStartMemory = getMemoryUsage();
  
  const parallelResults = await Promise.allSettled(
    Array.from({ length: taskCount }, (_, i) => heavyTask(i, taskSize))
  );
  
  const endParallel = Date.now();
  const parallelEndMemory = getMemoryUsage();
  
  console.log(colors.green(`✅ 병렬 처리 완료: ${endParallel - startParallel}ms`));
  console.log(colors.cyan(`메모리 증가: ${parallelEndMemory.heapUsed - parallelStartMemory.heapUsed}MB`));
  
  // 성능 비교 결과
  const speedup = (endSequential - startSequential) / (endParallel - startParallel);
  console.log(colors.magenta(`\n🚀 성능 개선: ${speedup.toFixed(2)}배 빠름`));
  console.log(colors.yellow(`⚠️  메모리 사용량은 병렬 처리가 더 높음\n`));
}

// 3. 배치 처리 성능 테스트
async function testBatchProcessingPerformance() {
  console.log(colors.blue('\n📦 === 배치 처리 성능 테스트 ==='));
  
  const totalTasks = 50;
  const taskSize = 2000;
  const batchSizes = [5, 10, 20];
  
  for (const batchSize of batchSizes) {
    console.log(colors.cyan(`\n🔄 배치 크기 ${batchSize} 테스트:`));
    logMemoryUsage('시작 전');
    
    const startTime = Date.now();
    const startMemory = getMemoryUsage();
    let peakMemory = startMemory.heapUsed;
    
    const allResults = [];
    
    for (let i = 0; i < totalTasks; i += batchSize) {
      const batch = Array.from(
        { length: Math.min(batchSize, totalTasks - i) },
        (_, j) => heavyTask(i + j, taskSize)
      );
      
      const batchResults = await Promise.allSettled(batch);
      allResults.push(...batchResults);
      
      const currentMemory = getMemoryUsage();
      peakMemory = Math.max(peakMemory, currentMemory.heapUsed);
      
      console.log(colors.yellow(`  배치 ${Math.floor(i/batchSize) + 1} 완료 (메모리: ${currentMemory.heapUsed}MB)`));
      
      // 배치 간 메모리 정리
      if (global.gc) {
        global.gc();
      }
    }
    
    const endTime = Date.now();
    const endMemory = getMemoryUsage();
    
    const successfulTasks = allResults.filter(r => r.status === 'fulfilled').length;
    
    console.log(colors.green(`✅ 배치 크기 ${batchSize} 완료:`));
    console.log(colors.green(`  - 총 시간: ${endTime - startTime}ms`));
    console.log(colors.cyan(`  - 피크 메모리: ${peakMemory}MB`));
    console.log(colors.cyan(`  - 최종 메모리: ${endMemory.heapUsed}MB`));
    console.log(colors.green(`  - 성공 작업: ${successfulTasks}/${totalTasks}`));
  }
}

// 4. 메모리 누수 시뮬레이션 및 감지
async function testMemoryLeakDetection() {
  console.log(colors.blue('\n🔍 === 메모리 사용 패턴 분석 ==='));
  
  const iterations = 10;
  const tasksPerIteration = 20;
  const taskSize = 1000;
  
  console.log(colors.cyan(`${iterations}번 반복, 각 ${tasksPerIteration}개 작업 실행`));
  
  const memorySnapshots = [];
  
  for (let iteration = 0; iteration < iterations; iteration++) {
    const beforeMemory = getMemoryUsage();
    
    // 작업 실행
    const results = await Promise.allSettled(
      Array.from({ length: tasksPerIteration }, (_, i) => 
        heavyTask(i, taskSize)
      )
    );
    
    const afterMemory = getMemoryUsage();
    
    // 가비지 컬렉션 시도
    if (global.gc) {
      global.gc();
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    const afterGCMemory = getMemoryUsage();
    
    memorySnapshots.push({
      iteration: iteration + 1,
      before: beforeMemory.heapUsed,
      after: afterMemory.heapUsed,
      afterGC: afterGCMemory.heapUsed,
      successful: results.filter(r => r.status === 'fulfilled').length
    });
    
    console.log(colors.yellow(
      `반복 ${iteration + 1}: ${beforeMemory.heapUsed}MB → ${afterMemory.heapUsed}MB → ${afterGCMemory.heapUsed}MB (GC 후)`
    ));
  }
  
  // 메모리 증가 패턴 분석
  console.log(colors.cyan('\n📊 메모리 사용 패턴 분석:'));
  
  const firstSnapshot = memorySnapshots[0];
  const lastSnapshot = memorySnapshots[memorySnapshots.length - 1];
  
  const totalIncrease = lastSnapshot.afterGC - firstSnapshot.before;
  const averageIncrease = totalIncrease / iterations;
  
  console.log(colors.green(`시작 메모리: ${firstSnapshot.before}MB`));
  console.log(colors.green(`최종 메모리: ${lastSnapshot.afterGC}MB`));
  console.log(colors.yellow(`총 증가량: ${totalIncrease}MB`));
  console.log(colors.yellow(`반복당 평균 증가: ${averageIncrease.toFixed(2)}MB`));
  
  if (averageIncrease > 1) {
    console.log(colors.red('⚠️  메모리 누수 가능성 감지!'));
  } else {
    console.log(colors.green('✅ 정상적인 메모리 사용 패턴'));
  }
  
  console.log('');
}

// 5. 다양한 Promise 조합 성능 테스트
async function testPromiseCombinationPerformance() {
  console.log(colors.blue('\n🎯 === Promise 조합 패턴 성능 테스트 ==='));
  
  const taskCount = 15;
  const taskSize = 1500;
  
  // Promise.all
  console.log(colors.cyan('\n1. Promise.all 패턴:'));
  logMemoryUsage('시작 전');
  const startAll = Date.now();
  try {
    const allResults = await Promise.all(
      Array.from({ length: taskCount }, (_, i) => heavyTask(i, taskSize))
    );
    const endAll = Date.now();
    console.log(colors.green(`✅ Promise.all: ${endAll - startAll}ms (${allResults.length}개 성공)`));
  } catch (error) {
    const endAll = Date.now();
    console.log(colors.red(`❌ Promise.all: ${endAll - startAll}ms (실패 시 조기 종료)`));
  }
  logMemoryUsage('완료 후');
  
  // Promise.allSettled
  console.log(colors.cyan('\n2. Promise.allSettled 패턴:'));
  logMemoryUsage('시작 전');
  const startSettled = Date.now();
  const settledResults = await Promise.allSettled(
    Array.from({ length: taskCount }, (_, i) => heavyTask(i, taskSize))
  );
  const endSettled = Date.now();
  const settledSuccess = settledResults.filter(r => r.status === 'fulfilled').length;
  console.log(colors.green(`✅ Promise.allSettled: ${endSettled - startSettled}ms (${settledSuccess}/${taskCount}개 성공)`));
  logMemoryUsage('완료 후');
  
  // Promise.race
  console.log(colors.cyan('\n3. Promise.race 패턴:'));
  logMemoryUsage('시작 전');
  const startRace = Date.now();
  try {
    const raceResult = await Promise.race(
      Array.from({ length: taskCount }, (_, i) => heavyTask(i, taskSize))
    );
    const endRace = Date.now();
    console.log(colors.green(`🏃‍♂️ Promise.race: ${endRace - startRace}ms (가장 빠른 작업 완료)`));
    console.log(colors.yellow(`  결과: Task ${raceResult.id}, 크기 ${raceResult.size}`));
  } catch (error) {
    const endRace = Date.now();
    console.log(colors.red(`❌ Promise.race: ${endRace - startRace}ms (가장 빠른 작업 실패)`));
  }
  logMemoryUsage('완료 후');
  
  console.log('');
}

// 메인 실행 함수
async function runPerformanceTests() {
  console.log(colors.blue('🚀 Promise 성능 테스트 시작'));
  console.log('='.repeat(50));
  
  // Node.js 가비지 컬렉션 활성화 메시지
  if (global.gc) {
    console.log(colors.green('✅ 가비지 컬렉션 사용 가능 (--expose-gc 플래그 감지)'));
  } else {
    console.log(colors.yellow('⚠️  가비지 컬렉션 비활성화 (더 정확한 테스트를 위해 --expose-gc 플래그 권장)'));
  }
  console.log('');
  
  try {
    await compareBasicPerformance();
    await compareSequentialVsParallel();
    await testBatchProcessingPerformance();
    await testMemoryLeakDetection();
    await testPromiseCombinationPerformance();
    
    console.log(colors.blue('🎉 모든 성능 테스트 완료!'));
    console.log('='.repeat(50));
    
    console.log(colors.cyan('\n📚 성능 테스트 결론:'));
    console.log(colors.yellow('• 병렬 처리는 빠르지만 메모리 사용량이 많음'));
    console.log(colors.yellow('• 배치 처리로 메모리 사용량과 성능의 균형 조절 가능'));
    console.log(colors.yellow('• Promise.allSettled는 Promise.all과 비슷한 성능'));
    console.log(colors.yellow('• 가비지 컬렉션으로 메모리 누수 방지 가능'));
    console.log(colors.yellow('• Promise.race는 가장 빠른 응답에 최적화\n'));
    
  } catch (error) {
    console.error(colors.red('성능 테스트 실행 중 오류 발생:'), error);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  runPerformanceTests().catch(console.error);
}

export { 
  runPerformanceTests,
  compareBasicPerformance,
  compareSequentialVsParallel,
  testBatchProcessingPerformance,
  testMemoryLeakDetection,
  testPromiseCombinationPerformance
};
