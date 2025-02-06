import React from "react";
import * as PDFJS from "pdfjs-dist";
import type {
    PDFDocumentProxy,
    RenderParameters,
} from "pdfjs-dist/types/src/display/api";
export interface PdfProps {
    src: string;
    height?: number;
    numberOfPages: (nb: number) => void,
    currentPage: number
}
const PdfViewer = (props: PdfProps) => {
    PDFJS.GlobalWorkerOptions.workerSrc =
        "https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
    const { src } = props;
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [pdfDoc, setPdfDoc] = React.useState<PDFDocumentProxy>();
    let renderTask: PDFJS.RenderTask;
    const renderPage = React.useCallback(
        (pageNum: number, pdf = pdfDoc) => {
            const canvas = canvasRef.current;
            if (!canvas || !pdf) return;
            canvas.height = 2000;
            canvas.width = 0;
            pdf
                .getPage(pageNum)
                .then((page) => {
                    const viewport = page.getViewport({ scale: 1.5 });
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext: RenderParameters = {
                        canvasContext: canvas.getContext("2d")!,
                        viewport: viewport,
                    };
                    try {
                        if (renderTask) {
                            renderTask.cancel();
                        }
                        renderTask = page.render(renderContext);
                        return renderTask.promise;
                    } catch (error) { }
                })
                .catch((error) => console.log(error));
        },
        [pdfDoc]
    );
    React.useEffect(() => {
        renderPage(props.currentPage, pdfDoc);
    }, [pdfDoc, props.currentPage, renderPage]);

    React.useEffect(() => {
        if (pdfDoc) {
            props.numberOfPages(pdfDoc.numPages)
        }
    }, [pdfDoc])

    React.useEffect(() => {
        const loadingTask = PDFJS.getDocument(src);
        loadingTask.promise.then(
            (loadedDoc) => {
                setPdfDoc(loadedDoc);
            },
            (error) => {
                console.error(error);
            }
        );
    }, [src]);

    return (
        <div style={{ position: "relative" }}>

            <canvas ref={canvasRef} style={{ height: "100%", width: "100%" }}></canvas>
        </div>
    );
}

export default PdfViewer;