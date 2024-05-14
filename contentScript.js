function updateImageSrc(src, format) {
    return src.includes('auto=format') ? src.replace(/auto=format/g, `auto=${format}`) : src;
}

function updateImageSrcset(srcset, format) {
    return srcset.split(',').map(src => {
        const [url, size] = src.trim().split(' ');
        return `${updateImageSrc(url, format)} ${size}`;
    }).join(', ');
}

function updateImages(format) {
    document.querySelectorAll('img').forEach(img => {
        if (img.src) {
            img.src = updateImageSrc(img.src, format);
        }
        if (img.srcset) {
            img.srcset = updateImageSrcset(img.srcset, format);
        }
    });
}

function applyFormat(format) {
    updateImages(format);
    console.log(`Todas las imágenes han sido cambiadas a ${format}.`);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'IMG') {
                        if (node.src) {
                            node.src = updateImageSrc(node.src, format);
                        }
                        if (node.srcset) {
                            node.srcset = updateImageSrcset(node.srcset, format);
                        }
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll('img').forEach(img => {
                            if (img.src) {
                                img.src = updateImageSrc(img.src, format);
                            }
                            if (img.srcset) {
                                img.srcset = updateImageSrcset(img.srcset, format);
                            }
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

const format = 'jpg';
applyFormat(format);
