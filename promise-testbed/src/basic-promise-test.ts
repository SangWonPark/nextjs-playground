/**
 * Promise.all vs Promise.allSettled 기본 테스트
 * 실행: npm run test:basic
 */

// 가상의 API 호출 시뮬레이션
function createMockAPICall(name: string, delay: number, shouldFail: boolean = false): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${name} API 호출 실패`));
      } else {
        resolve(`${name} API 응답 완료 (${delay}ms 소요)`);
      }
    }, delay);
  });
}

// 색상 출력을 위한 간단한 헬퍼
const colors = {
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
};

async function testPromiseAll() {
  console.log(colors.blue('\n=== Promise.all 테스트 ==='));
  
  console.log(colors.cyan('\n1. 모든 Promise가 성공하는 경우:'));
  try {
    const startTime = Date.now();
    const results = await Promise.all([
      createMockAPICall('사용자 정보', 1000),
      createMockAPICall('결제 정보', 1500),
      createMockAPICall('주문 내역', 800)
    ]);
    const endTime = Date.now();
    
    console.log(colors.green('✅ 모든 API 호출 성공:'));
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result}`);
    });
    console.log(colors.green(`총 소요 시간: ${endTime - startTime}ms\n`));
  } catch (error) {
    console.log(colors.red(`❌ 오류 발생: ${error}`));
  }

  console.log(colors.cyan('2. 하나의 Promise가 실패하는 경우:'));
  try {
    const startTime = Date.now();
    const results = await Promise.all([
      createMockAPICall('사용자 정보', 1000),
      createMockAPICall('결제 정보', 1500, true), // 실패하는 API
      createMockAPICall('주문 내역', 800)
    ]);
    console.log(colors.green('모든 API 호출 성공'), results);
  } catch (error) {
    const endTime = Date.now();
    console.log(colors.red(`❌ Promise.all 실패: ${error}`));
    console.log(colors.yellow(`실패까지 소요 시간: ${endTime}ms`));
    console.log(colors.yellow('⚠️  성공한 API들의 결과도 받을 수 없음\n'));
  }
}

async function testPromiseAllSettled() {
  console.log(colors.blue('\n=== Promise.allSettled 테스트 ==='));
  
  console.log(colors.cyan('\n1. 모든 Promise가 성공하는 경우:'));
  const startTime1 = Date.now();
  const results1 = await Promise.allSettled([
    createMockAPICall('사용자 정보', 1000),
    createMockAPICall('결제 정보', 1500),
    createMockAPICall('주문 내역', 800)
  ]);
  const endTime1 = Date.now();
  
  console.log(colors.green('✅ 모든 Promise 완료:'));
  results1.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(colors.green(`  ${index + 1}. 성공: ${result.value}`));
    } else {
      console.log(colors.red(`  ${index + 1}. 실패: ${result.reason}`));
    }
  });
  console.log(colors.green(`총 소요 시간: ${endTime1 - startTime1}ms\n`));

  console.log(colors.cyan('2. 일부 Promise가 실패하는 경우:'));
  const startTime2 = Date.now();
  const results2 = await Promise.allSettled([
    createMockAPICall('사용자 정보', 1000),
    createMockAPICall('결제 정보', 1500, true), // 실패하는 API
    createMockAPICall('주문 내역', 800),
    createMockAPICall('알림 설정', 1200, true), // 또 다른 실패하는 API
  ]);
  const endTime2 = Date.now();
  
  console.log(colors.yellow('📊 부분 성공/실패 결과:'));
  
  const successful = results2.filter(result => result.status === 'fulfilled');
  const failed = results2.filter(result => result.status === 'rejected');
  
  console.log(colors.green(`✅ 성공한 API (${successful.length}개):`));
  successful.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`  - ${result.value}`);
    }
  });
  
  console.log(colors.red(`❌ 실패한 API (${failed.length}개):`));
  failed.forEach((result) => {
    if (result.status === 'rejected') {
      console.log(`  - ${result.reason}`);
    }
  });
  
  console.log(colors.yellow(`총 소요 시간: ${endTime2 - startTime2}ms`));
  console.log(colors.green('✅ 실패한 API가 있어도 성공한 결과는 모두 받을 수 있음\n'));
}

async function testPromiseRace() {
  console.log(colors.blue('\n=== Promise.race 테스트 ==='));
  
  console.log(colors.cyan('가장 빠른 응답을 받는 경우:'));
  try {
    const startTime = Date.now();
    const result = await Promise.race([
      createMockAPICall('느린 API', 2000),
      createMockAPICall('보통 API', 1000),
      createMockAPICall('빠른 API', 500),
    ]);
    const endTime = Date.now();
    
    console.log(colors.green(`🏃‍♂️ 가장 빠른 결과: ${result}`));
    console.log(colors.green(`소요 시간: ${endTime - startTime}ms\n`));
  } catch (error) {
    console.log(colors.red(`❌ 가장 빠른 응답이 실패: ${error}\n`));
  }
}

async function testTimeoutPattern() {
  console.log(colors.blue('\n=== 타임아웃 패턴 테스트 ==='));
  
  function createTimeoutPromise<T>(promise: Promise<T>, timeout: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout);
      })
    ]);
  }
  
  console.log(colors.cyan('1. 정상 응답 (타임아웃 이전):'));
  try {
    const result = await createTimeoutPromise(
      createMockAPICall('빠른 API', 800),
      2000 // 2초 타임아웃
    );
    console.log(colors.green(`✅ 성공: ${result}\n`));
  } catch (error) {
    console.log(colors.red(`❌ 실패: ${error}\n`));
  }
  
  console.log(colors.cyan('2. 타임아웃 발생:'));
  try {
    const result = await createTimeoutPromise(
      createMockAPICall('느린 API', 3000),
      1000 // 1초 타임아웃
    );
    console.log(colors.green(`✅ 성공: ${result}\n`));
  } catch (error) {
    console.log(colors.red(`❌ 타임아웃: ${error}\n`));
  }
}

// 메인 실행 함수
async function runBasicTests() {
  console.log(colors.blue('🧪 Promise 기본 테스트 시작\n'));
  console.log('='.repeat(50));
  
  await testPromiseAll();
  await testPromiseAllSettled();
  await testPromiseRace();
  await testTimeoutPattern();
  
  console.log(colors.blue('🎉 모든 기본 테스트 완료!'));
  console.log('='.repeat(50));
}

// 스크립트 직접 실행 시 (ES 모듈 방식)
if (import.meta.url === `file://${process.argv[1]}`) {
  runBasicTests().catch(console.error);
}

export { runBasicTests };
