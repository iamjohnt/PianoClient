export default class Queue<T> {
    private buffer: T[];
    private capacity: number;
    private size: number;
    private writeIndex: number;
    private readIndex: number;
  
    constructor(capacity: number) {
      this.capacity = capacity;
      this.buffer = new Array<T>(capacity);
      this.size = 0;
      this.writeIndex = 0;
      this.readIndex = 0;
    }
  
    public isFull(): boolean {
      return this.size === this.capacity;
    }
  
    public isEmpty(): boolean {
      return this.size === 0;
    }
  
    public enqueue(item: T): void {
      if (this.isFull()) {
        throw new Error('Circular buffer is full');
      }
  
      this.buffer[this.writeIndex] = item;
      this.writeIndex = (this.writeIndex + 1) % this.capacity;
      this.size++;
    }
  
    public dequeue(): T {
      if (this.isEmpty()) {
        throw new Error('Circular buffer is empty');
      }
  
      const item = this.buffer[this.readIndex];
      this.readIndex = (this.readIndex + 1) % this.capacity;
      this.size--;
      return item;
    }
  }