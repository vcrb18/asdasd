export function ImageToBlobParser(image: HTMLCanvasElement) {
    const dataURL = image.toDataURL();
    const byteString = window.atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: 'image/png' });
}

export const createFormData = (imageBlob: Blob, fileName: string, doctorId: number | null) => {
    const formData = new FormData();
    formData.append('doctorId', `${doctorId}`);
    formData.append('fileName', fileName);
    formData.append('imageBlob', imageBlob);
    return formData;
}
