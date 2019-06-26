export class PackageUidModel {
    id: string;
    version: string;

    set uid(value: string) {
        if (value == null) {
            return;
        }

        if (!value.includes("@")) {
            this.id = value;
        }

        this.id = value.substring(0, value.indexOf("@"));
        this.version = value.substring(value.indexOf("@") + 1)
    }

    get uid(): string {
        return this.toString();
    }

    toString(): string {
        return `${this.id}@${this.version}`;
    }
}