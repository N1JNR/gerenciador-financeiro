import { Routes } from "@angular/router";
import { Home } from "./home";
import { CreateorEditComponent } from "./pages/create-or-edit/create-or-edit.component";
import { getTransactionByIdResolver } from "./pages/create-or-edit/resolvers/get-transaction-by-id-resolver";

export default [
    {
        path: '',
        component: Home
    },
    {
        path: 'create',
        component: CreateorEditComponent
    },
     {
        path: 'edit/:id',
        component: CreateorEditComponent,
        resolve: {
            transaction: getTransactionByIdResolver
        }
    }
] as Routes;