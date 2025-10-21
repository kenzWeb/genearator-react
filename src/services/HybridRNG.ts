import type { EntropySource, EntropyData } from '../types';

export class HybridRNG {
  private mouseEntropy: number[] = [];
  private timestampEntropy: number[] = [];
  private entropyPool: number[] = [];

  async collectEntropy(callback?: (source: EntropySource) => void): Promise<EntropyData> {
    const sources: EntropySource[] = [];
    const startTime = Date.now();

    const mouseSource = await this.collectMouseEntropy();
    sources.push(mouseSource);
    callback?.(mouseSource);

    const timestampSource = await this.collectTimestampJitter();
    sources.push(timestampSource);
    callback?.(timestampSource);

    const cryptoSource = await this.collectWebCrypto();
    sources.push(cryptoSource);
    callback?.(cryptoSource);

    const atmosphericSource = await this.simulateAtmosphericNoise();
    sources.push(atmosphericSource);
    callback?.(atmosphericSource);

    const totalEntropy = sources.reduce((sum, s) => sum + s.collected, 0);
    const collectionTime = Date.now() - startTime;

    return { sources, totalEntropy, collectionTime };
  }

  private async collectMouseEntropy(): Promise<EntropySource> {
    return new Promise((resolve) => {
      const entropy: number[] = [];
      const startTime = Date.now();
      let moveCount = 0;

      const handler = (e: MouseEvent) => {
        const value = (e.clientX * e.clientY * e.timeStamp) % 256;
        entropy.push(value);
        this.mouseEntropy.push(value);
        moveCount++;

        if (moveCount >= 50 || Date.now() - startTime > 2000) {
          window.removeEventListener('mousemove', handler);
          this.mixIntoPool(entropy);
          resolve({
            name: 'Mouse Movement',
            type: 'physical',
            collected: entropy.length,
            quality: Math.min(entropy.length / 50, 1)
          });
        }
      };

      window.addEventListener('mousemove', handler);

      setTimeout(() => {
        window.removeEventListener('mousemove', handler);
        if (entropy.length === 0) {
          for (let i = 0; i < 50; i++) {
            const val = (Date.now() * Math.random() * (i + 1)) % 256;
            entropy.push(val);
            this.mouseEntropy.push(val);
          }
        }
        this.mixIntoPool(entropy);
        resolve({
          name: 'Mouse Movement',
          type: 'physical',
          collected: entropy.length,
          quality: Math.min(entropy.length / 50, 1)
        });
      }, 2000);
    });
  }

  private async collectTimestampJitter(): Promise<EntropySource> {
    const entropy: number[] = [];
    const samples = 100;

    for (let i = 0; i < samples; i++) {
      const t1 = performance.now();
      await this.microDelay();
      const t2 = performance.now();
      const jitter = Math.floor((t2 - t1) * 1000000) % 256;
      entropy.push(jitter);
      this.timestampEntropy.push(jitter);
    }

    this.mixIntoPool(entropy);

    return {
      name: 'Timestamp Jitter',
      type: 'algorithmic',
      collected: entropy.length,
      quality: 0.95
    };
  }

  private async collectWebCrypto(): Promise<EntropySource> {
    const array = new Uint8Array(256);
    crypto.getRandomValues(array);
    const entropy = Array.from(array);
    this.mixIntoPool(entropy);

    return {
      name: 'Web Crypto API',
      type: 'hybrid',
      collected: entropy.length,
      quality: 1.0
    };
  }

  private async simulateAtmosphericNoise(): Promise<EntropySource> {
    const entropy: number[] = [];
    const samples = 200;

    for (let i = 0; i < samples; i++) {
      const noise = this.generateAtmosphericNoise(i);
      entropy.push(noise);
    }

    this.mixIntoPool(entropy);

    return {
      name: 'Atmospheric Noise Simulation',
      type: 'algorithmic',
      collected: entropy.length,
      quality: 0.85
    };
  }

  private generateAtmosphericNoise(seed: number): number {
    const t = Date.now() + seed;
    const x = Math.sin(t * 0.001) * 10000;
    const y = Math.cos(t * 0.002) * 10000;
    const z = Math.sin(t * 0.003) * Math.cos(t * 0.004) * 10000;
    return Math.abs(Math.floor((x + y + z) * seed)) % 256;
  }

  private mixIntoPool(entropy: number[]): void {
    for (const value of entropy) {
      this.entropyPool.push(value);
    }
  }

  private microDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 0));
  }

  generateRandomNumbers(count: number): number[] {
    const numbers: number[] = [];
    
    for (let i = 0; i < count; i++) {
      const poolIndex = i % this.entropyPool.length;
      const entropy1 = this.entropyPool[poolIndex];
      const entropy2 = this.entropyPool[(poolIndex + 1) % this.entropyPool.length];
      const entropy3 = this.entropyPool[(poolIndex + 2) % this.entropyPool.length];
      
      const mixed = (entropy1 ^ entropy2 ^ entropy3) + Date.now();
      const hash = this.simpleHash(mixed.toString() + i);
      numbers.push(hash % 100);
    }
    
    return numbers;
  }

  generateBinarySequence(length: number): number[] {
    const binary: number[] = [];
    
    for (let i = 0; i < length; i++) {
      const poolIndex = i % this.entropyPool.length;
      const entropy = this.entropyPool[poolIndex];
      const bit = (entropy ^ (Date.now() % 256)) & 1;
      binary.push(bit);
    }
    
    return binary;
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  reset(): void {
    this.mouseEntropy = [];
    this.timestampEntropy = [];
    this.entropyPool = [];
  }
}
