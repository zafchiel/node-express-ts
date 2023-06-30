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
exports.createProduct = exports.getProductByName = exports.getProductById = exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getAllProducts = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const productArray = yield db_1.default.select().from(schema_1.products);
    if (!productArray) {
        throw new Error("No products found");
    }
    _res.status(200).json(productArray);
});
exports.getAllProducts = getAllProducts;
const getProductById = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = _req.params;
    const product = yield db_1.default
        .select()
        .from(schema_1.products)
        .where((0, drizzle_orm_1.sql) `${schema_1.products.id} = ${id}`)
        .limit(1);
    if (!product) {
        throw new Error("Product not found");
    }
    _res.status(200).json(product);
});
exports.getProductById = getProductById;
const getProductByName = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = _req.params;
    const product = yield db_1.default
        .select()
        .from(schema_1.products)
        .where((0, drizzle_orm_1.eq)(schema_1.products.name, name));
    if (!product) {
        throw new Error("Product not found");
    }
    _res.status(200).json(product);
});
exports.getProductByName = getProductByName;
const createProduct = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_req.body) {
        throw new Error("Missing body");
    }
    if (!_req.body.name || !_req.body.price) {
        throw new Error("Missing required fields");
    }
    const product = yield db_1.default
        .insert(schema_1.products)
        .values(_req.body)
        .returning();
    if (!product) {
        throw new Error("Product not found");
    }
    _res.status(200).json(product);
});
exports.createProduct = createProduct;
