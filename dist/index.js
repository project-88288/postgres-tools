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
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
// Replace 'your_connection_string' with your actual connection string
const connectionString = 'postgres://dev:dev@localhost:5432/workermainnet';
const db = pgp(connectionString);
function runQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db.query('SELECT * FROM block');
            console.log(result);
            // Handle the query result
        }
        catch (error) {
            console.error('Error executing query:', error);
        }
        finally {
            pgp.end(); // Close the database connection
        }
    });
}
function insertvalue() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db.query('INSERT INTO "block"("height", "latestheight") VALUES (0, 0) RETURNING "id"');
            console.log(result);
            // Handle the query result
        }
        catch (error) {
            console.error('Error executing query:', error);
        }
        finally {
            pgp.end(); // Close the database connection
        }
    });
}
// insertvalue();
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db.query('UPDATE block  SET height = 0, latestheight = 0 WHERE id = 6;');
            console.log(result);
            // Handle the query result
        }
        catch (error) {
            console.error('Error executing query:', error);
        }
        finally {
            pgp.end(); // Close the database connection
        }
    });
}
update();
function deleteit() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db.query('DELETE FROM block WHERE id = 7;');
            console.log(result);
            // Handle the query result
        }
        catch (error) {
            console.error('Error executing query:', error);
        }
        finally {
            pgp.end(); // Close the database connection
        }
    });
}
//deleteit();
runQuery();
function describtable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db.query('SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = "block";');
            console.log(result);
            // Handle the query result
        }
        catch (error) {
            console.error('Error executing query:', error);
        }
        finally {
            pgp.end(); // Close the database connection
        }
    });
}
//describtable();
/*
ts-node index.ts
async function runParameterizedQuery() {
  try {
    const userId = 1;
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    console.log(result);
    // Handle the query result
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    pgp.end(); // Close the database connection
  }
}

//runParameterizedQuery();

*/
