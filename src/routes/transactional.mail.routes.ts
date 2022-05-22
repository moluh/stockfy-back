import { Request, Response, NextFunction } from 'express'
import { TransactionalMailsController } from '../controllers/transactional.mail'

export class MailTransactionRoute {
    public controlador: TransactionalMailsController =
        new TransactionalMailsController()

    public routes(app): void {
        app.route('/api/v1/mailtransaction').post(
            (req: Request, res: Response, next: NextFunction) => {
                next()
            },
            this.controlador.createTransport
        )
    }
}
