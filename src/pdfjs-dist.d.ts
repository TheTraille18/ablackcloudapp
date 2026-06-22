declare module 'pdfjs-dist/build/pdf' {
  export const GlobalWorkerOptions: { workerSrc: string };
  export const Util: {
    transform: (matrix1: number[], matrix2: number[]) => number[];
  };
  export function getDocument(src: { data: ArrayBuffer }): {
    promise: Promise<{
      numPages: number;
      getPage(pageNumber: number): Promise<{
        getViewport(params: { scale: number }): {
          width: number;
          height: number;
          scale: number;
          transform: number[];
        };
        getTextContent(): Promise<{
          items: Array<{ str?: string; transform?: number[]; width?: number }>;
        }>;
        render(params: {
          canvasContext: CanvasRenderingContext2D;
          viewport: { width: number; height: number };
        }): { promise: Promise<void> };
      }>;
    }>;
  };
}
