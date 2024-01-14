import { Controller, Get, Param, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';

/**
 * A controller with functions for manipulating files on the server
 * @export
 * @class UploadController
 */
@Controller('media')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * Downloading files located on the server
   * @param {string} fileId the ID of the UploadedFile class object
   * @param {Response} response response from the server
   * @return {Promise<void>}
   * @memberof UploadController
   */
  @Get(':fileId')
  async download(
    @Param('fileId') fileId: string,
    @Res() response: Response,
  ): Promise<void> {
    return await this.uploadService.download(fileId.replace('/', ''), response);
  }
}
