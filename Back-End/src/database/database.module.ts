import {Global, Module} from '@nestjs/common';
import {DatabaseService} from './database.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Accountbank} from '../entities/Accountbank';
import {Admin} from '../entities/Admin';
import {Allnotification} from '../entities/Allnotification';
import {Autosms} from '../entities/Autosms';
import {Agent} from '../entities/Agent';
import {Customer} from '../entities/Customer';
import {Deposit} from '../entities/Deposit';
import {Logsorder} from '../entities/Logsorder';
import {Manager} from '../entities/Manager';
import {Notification} from '../entities/Notification';
import {Operation} from '../entities/Operation';
import {Settlement} from '../entities/Settlement';
import {Typebank} from '../entities/Typebank';
import {TypeNotification} from '../entities/TypeNotification';
import {Webhook} from '../entities/Webhook';
import {Withdraw} from '../entities/Withdraw';
import {TotalCustomerBanktransfer} from '../entities/TotalCustomerBanktransfer';
import {TotalKsher} from '../entities/TotalKsher';
import {CryptoWallet} from '../entities/CryptoWallet';
import {MdrDeposit} from '../entities/MdrDeposit';
import {MdrWithdraw} from '../entities/MdrWithdraw';
import {MdrFeeSettlement} from '../entities/MdrFeeSettlement';
import {MutiAccount} from '../entities/MutiAccount';
import {Order} from '../entities/Order';
import {Merchant} from '../entities/Merchant';
import {MerchantPiPay} from '../entities/MerchantPiPay';
import {DirepayTransaction} from '../entities/DirepayTransaction';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      MerchantPiPay, Merchant, Order, Accountbank, Admin, Allnotification, Autosms, Customer, Deposit, Logsorder,
      Manager, Notification, Operation, Settlement, Typebank, TypeNotification, Webhook, Withdraw,
      TotalCustomerBanktransfer, TotalKsher, Agent, CryptoWallet, MdrDeposit, MdrWithdraw, MdrFeeSettlement,
      MutiAccount, DirepayTransaction]),
  ],
  providers: [DatabaseService],
  exports: [
    TypeOrmModule,
    DatabaseService
  ]
})
export class DatabaseModule {
}
