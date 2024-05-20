package com.dt.flashlearn.validate;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.exception.MessageException;

public class ValidateData {
    public static void validateNotNull(Object obj) {
    if (obj == null) {
        throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
    }
}
    
}
