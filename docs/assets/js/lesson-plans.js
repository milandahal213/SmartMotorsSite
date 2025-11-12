// Set PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Store current PDF documents and state
const pdfDocs = {};
const currentPages = {};
const currentPdfUrls = {}; // Track which PDF is currently displayed

// Function to render a PDF page
async function renderPDF(url, canvasId, pageNum = 1) {
  const canvas = document.getElementById(canvasId) || document.querySelector(`[data-thumbnail-for="${canvasId}"]`);
  if (!canvas) return;
  
  const context = canvas.getContext('2d');
  
  try {
    // Load PDF
    if (!pdfDocs[url]) {
      pdfDocs[url] = await pdfjsLib.getDocument(url).promise;
    }
    const pdf = pdfDocs[url];
    
    // Get page
    const page = await pdf.getPage(pageNum);
    
    // Set canvas size
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    // Render page
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    return pdf.numPages;
  } catch (error) {
    console.error('Error rendering PDF:', error);
  }
}

// Initialize PDFs on page load
document.addEventListener('DOMContentLoaded', async function() {
  // Find all lesson sections
  const sections = document.querySelectorAll('.lesson-plan-section');
  
  sections.forEach(async section => {
    const previewBox = section.querySelector('.preview-box');
    const lessonId = previewBox.dataset.lesson;
    const thumbnails = section.querySelectorAll('.thumbnail-item');
    
    if (thumbnails.length === 0) return;
    
    // Load first PDF in main preview
    const firstThumbnail = thumbnails[0];
    const firstPdfUrl = firstThumbnail.dataset.pdfUrl;
    const canvasId = `pdf-canvas-${lessonId}`;
    
    currentPages[lessonId] = 1;
    currentPdfUrls[lessonId] = firstPdfUrl; // Track current PDF
    const numPages = await renderPDF(firstPdfUrl, canvasId, 1);
    
    // Update page count
    const pageCountEl = document.getElementById(`page-count-${lessonId}`);
    if (pageCountEl) pageCountEl.textContent = numPages;
    
    // Setup navigation buttons
    const prevBtn = document.getElementById(`prev-${lessonId}`);
    const nextBtn = document.getElementById(`next-${lessonId}`);
    const pageNumEl = document.getElementById(`page-num-${lessonId}`);
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', async () => {
        if (currentPages[lessonId] > 1) {
          currentPages[lessonId]--;
          await renderPDF(currentPdfUrls[lessonId], canvasId, currentPages[lessonId]);
          pageNumEl.textContent = currentPages[lessonId];
        }
      });
      
      nextBtn.addEventListener('click', async () => {
        const currentPdf = pdfDocs[currentPdfUrls[lessonId]];
        if (currentPdf && currentPages[lessonId] < currentPdf.numPages) {
          currentPages[lessonId]++;
          await renderPDF(currentPdfUrls[lessonId], canvasId, currentPages[lessonId]);
          pageNumEl.textContent = currentPages[lessonId];
        }
      });
    }
    
    // Load thumbnails (first page of each PDF)
    thumbnails.forEach(async (thumbnail, index) => {
      const pdfUrl = thumbnail.dataset.pdfUrl;
      const thumbnailCanvas = thumbnail.querySelector('.thumbnail-canvas');
      if (thumbnailCanvas) {
        const thumbId = thumbnailCanvas.dataset.thumbnailFor;
        await renderPDF(pdfUrl, thumbId, 1);
      }
    });
    
    // Click handler for thumbnails (not the download button)
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', async function(e) {
        // Don't trigger if clicking the download button
        if (e.target.closest('.thumbnail-download-btn')) {
          return;
        }
        
        e.preventDefault();
        const pdfUrl = this.dataset.pdfUrl;
        const title = this.dataset.title;
        const labelEl = document.getElementById(`preview-label-${lessonId}`);
        
        // Update label
        if (labelEl) labelEl.textContent = title;
        
        // Update current PDF URL
        currentPdfUrls[lessonId] = pdfUrl;
        
        // Render new PDF
        currentPages[lessonId] = 1;
        const numPages = await renderPDF(pdfUrl, canvasId, 1);
        
        // Update page info
        pageNumEl.textContent = 1;
        pageCountEl.textContent = numPages;
      });
    });
  });
});