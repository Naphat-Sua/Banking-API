import {extname} from 'path';
import * as moment from 'moment-timezone';
import { Logger } from '@nestjs/common';

export default (req, file, callback) => {
    Logger.debug(file.originalname)
    const fileExtName = extname(file.originalname);
    const NameFileConfirmDocument = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
    callback(null, `${NameFileConfirmDocument}${fileExtName}`);
};
