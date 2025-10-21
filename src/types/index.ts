export interface EntropySource {
  name: string;
  type: 'physical' | 'algorithmic' | 'hybrid';
  collected: number;
  quality: number;
}

export interface RandomSequence {
  id: string;
  timestamp: number;
  numbers: number[];
  binaryData: number[];
  hash: string;
  entropyData: EntropyData;
}

export interface EntropyData {
  sources: EntropySource[];
  totalEntropy: number;
  collectionTime: number;
}

export interface StatisticalTest {
  name: string;
  result: 'passed' | 'failed' | 'pending';
  pValue: number;
  threshold: number;
  description: string;
}

export interface TestResults {
  frequencyTest: StatisticalTest;
  runsTest: StatisticalTest;
  chiSquareTest: StatisticalTest;
  serialCorrelationTest: StatisticalTest;
  overall: 'passed' | 'failed' | 'pending';
}

export interface DrawSession {
  id: string;
  timestamp: number;
  sequence: RandomSequence;
  testResults: TestResults;
  verified: boolean;
}

export interface VisualizationState {
  stage: 'idle' | 'collecting' | 'processing' | 'testing' | 'complete';
  progress: number;
  currentSource?: string;
}
