"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KVRepository_1 = require("./KVRepository");
const levelup_1 = __importDefault(require("levelup"));
const leveldown_1 = __importDefault(require("leveldown"));
const level_ttl_1 = __importDefault(require("level-ttl"));
class MeasurementRepository extends KVRepository_1.KVRepository {
    constructor(_db = level_ttl_1.default(levelup_1.default(leveldown_1.default("./db")))) {
        super();
        this._db = _db;
    }
    find(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._db.get(JSON.stringify({
                    sensorId: key.sensorId,
                    dateTime: key.dateTime
                }));
                return Promise.resolve([JSON.parse(response)]);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    create(key, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._db.put(JSON.stringify({
                    sensorId: key.sensorId,
                    dateTime: key.dateTime
                }), JSON.stringify(item), {
                    ttl: 1000 * 60 * 60 * 73
                });
                return Promise.resolve(true);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    exists(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._db.get(JSON.stringify({
                    sensorId: key.sensorId,
                    dateTime: key.dateTime
                }));
                return Promise.resolve(true);
            }
            catch (error) {
                if (error.notFound) {
                    return Promise.resolve(false);
                }
                return Promise.reject(error);
            }
        });
    }
    update(key, item) {
        throw new Error("Method not implemented.");
    }
    delete(key) {
        throw new Error("Method not implemented.");
    }
}
exports.MeasurementRepository = MeasurementRepository;
