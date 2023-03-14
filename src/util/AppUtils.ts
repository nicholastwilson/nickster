class AppUtils {

    static init() {
        AppUtils.initArrayUtils();
    }

    static initArrayUtils() {
        Array.prototype.shuffle = function() {
            let i, j, temp;
            for(i = this[i].length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = this[i];
                this[i] = this[j];
                this[j] = temp;
            }
        };
    }

}

interface Array<T> {
    shuffle(): void;
}